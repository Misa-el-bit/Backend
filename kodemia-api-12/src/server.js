//Definicion de nuestro servidor
const express = require("express")
const cors = require("cors")
const middlewareLog = require("./middlewares/mdlwre_application")
const kodersRouter = require("./routers/koders")
const mentorsRouter = require("./routers/mentors")
const cellsRouter = require("./routers/cells")
const authRouter = require("./routers/auth")


const server = express()

//middlewares
server.use(cors())
server.use(express.json())
server.use(middlewareLog)

//agregar los routers
server.use("/koders", kodersRouter)
server.use("/mentors", mentorsRouter)
server.use("/cells", cellsRouter)
server.use("/auth", authRouter)



module.exports = server

//requerimiento 
//endpoint GET/koders
//1- Asegurarnos que nuestro Modelo exista
//2- Crear el caso de uso necesario
//3- Crear el endpoint

//practica
//referencias
//crear celulas de mentores
//actulaizar las celulas 
//eliminarlas 
//obtener detalle

