import { Response, Request } from "express"
import { Config } from "../../Config"

class AiService {
  async sendText(req: Request, res: Response) {
    const userPrompt = req.body.prompt ?? "Oi"

    const ollamaRes = await fetch(Config.AI.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: Config.AI.MODEL,
        prompt: userPrompt,
        stream: false,
      }),
    })

    const data = await ollamaRes.json()

    res.status(200).json({
      answer: data.response,
    })
  }

}

export default AiService
