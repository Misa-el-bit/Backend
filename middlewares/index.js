const koderRouter = require("./routerKoders")
const express = require("express")

const server = express()

server.use("/koders", koderRouter)

//server.use(express.json())

// factory functions
function factoryMiddleware(){
    return (request, response, next) => {
        console.log("Middleware factory")
        next()
    }
}
server.use(factoryMiddleware()) //esto es lo mismo que la linea 6

function middleware(request,response, next){
    console.log("Middleware externo")
    next()
}
server.use(middleware)

//un middleware son funciones que reciben (request,response,next)=>{}
//middleware a nivel de aplicación o servidor
server.use((request, response, next) => {
    console.log("Middleware de aplicación")
    next()
})



server.get("/", (request, response)=>{
    response.json({
        message: "Hola koders"
    })
})

//middleware a nivel de ruta
server.get("/koders", (request, response, next) => {
    console.log("Middleware a la ruta: GET/Koders")
    next()
}, (request, response)=>{
    response.json({
        message: "Hola koders"
    })
})

server.listen(8080, () =>{
    console.log("Server listening")
})