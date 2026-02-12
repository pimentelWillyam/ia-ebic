import { Response, Request } from "express"
import axios from "axios"
import { Config } from "../../Config"
import { AI_GUIDELINES } from "../../ai/AI_GUIDELINES"

class AiService {
  async sendText(req: Request, res: Response) {
    try {
      const ollamaRes = await axios.post(
        `${Config.AI.URL}/api/generate`,
        {
          model: Config.AI.MODEL,
          format: "json",
          prompt: AI_GUIDELINES + req.body.prompt,
          stream: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 60_000, // importante em LLM
        }
      )

      const data = ollamaRes.data

      let answer
      try {
        answer = JSON.parse(data.response)
      } catch {
        return res.status(500).json({
          error: "IA retornou JSON inválido",
          raw: data.response,
        })
      }

      return res.status(200).json({
        answer,
        model: data.model,
        done: data.done,
      })

    } catch (error: any) {
      console.error(error)

      if (axios.isAxiosError(error)) {
        return res.status(500).json({
          error: "Erro ao chamar Ollama",
          message: error.message,
          details: error.response?.data,
        })
      }

      return res.status(500).json({
        error: "Erro interno na IA",
        message: error.message,
      })
    }
  }
}

export default AiService
