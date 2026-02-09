import { Response, Request } from "express"
import axios from "axios"
import { Config } from "../../Config"

class AiService {
  async sendText(req: Request, res: Response) {
    try {
      console.log('chegou aq')
      const userPrompt = req.body.prompt ?? "Oi"
      console.log("localhost:11434/api/generate")


      const ollamaRes = await axios.post(
        Config.AI.URL+'/api/generate',
        {
          model: Config.AI.MODEL,
          prompt: "oi",
          stream: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const data = ollamaRes.data

      res.status(200).json({
        answer: data.response,
        model: data.model,
        done: data.done,
      })

    } catch (error: any) {
      // Erro vindo do Ollama
      console.error(error)
      if (axios.isAxiosError(error)) {
        return res.status(500).json({
          error: "Erro ao chamar Ollama",
          message: error.message,
          details: error.response?.data,
        })
      }

      // Erro inesperado
      res.status(500).json({
        error: "Erro interno na IA",
        message: error.message,
      })
    }
  }
}

export default AiService
