import {Request,Response} from "express"

import AiValidator from "../validators/AiValidator"
const aiValidator = new AiValidator()

import AiService from "../services/AiService"
const aiService = new AiService()

class AiController{
    postaAi(req: Request, res: Response){
        if (aiValidator.execute(req)){
            aiService.sendText(req,res)
        }
        else{
            res.status(400).json({message: "Requisição inválida"})
        }
    }

}

export default AiController