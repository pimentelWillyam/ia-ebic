import app from "./api/app"
import { Config } from "./Config"

app.listen(Config.API.PORT, () =>{
    console.log(`aplicação iniciada no endereço ${Config.API.HOST}:${Config.API.PORT}`)
    console.log(`ROTAS: 
        POST ${Config.API.HOST}:${Config.API.PORT}/api/dialogue
        POST ${Config.API.HOST}:${Config.API.PORT}/api/ai
        `)

})