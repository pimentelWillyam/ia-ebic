// importando .env
require("dotenv-safe").config({silent: true});

// importando rotas
import aiRoutes from "./routes/aiRoutes";

//importando core da api
import * as express from "express"
import * as bodyParser from "body-parser";
import * as cors from "cors"

// criando o app
const app = express()

//aplicando middlewares
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

//utilizando rotas da api
app.use("/api", aiRoutes) 

export default app
