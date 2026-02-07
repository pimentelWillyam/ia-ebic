import app from "./api/app"

app.listen(process.env.PORTA, () =>{
    console.log(`aplicação iniciada na porta ${process.env.PORTA}`)
    console.log(`ROTAS: 
        POST ${process.env.HOST}:${process.env.PORTA}/api/dialogue
        `)

})