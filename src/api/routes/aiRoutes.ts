// importando core da rota
import * as express from "express"
import { Request, Response } from "express"

//importando service da rota
import AiController from "../controllers/AiController"
const aiController = new AiController()

//criando rotas
const aiRoutes  = express.Router()

aiRoutes.post("/ai/generate", (req: Request,res: Response) => {aiController.postaAi(req,res)})


export default aiRoutes