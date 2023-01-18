const { request } = require("express")
const express = require("express")
const mongoose = require("mongoose")
const Koder = require("./koderModel")
const server = express()

//Variables de entorno
const DB_USER = "Misa-el"
const DB_PASSWORD = "Scarface1*"
const DB_HOST = "kodemia-12va.8gcqb.mongodb.net"
const DB_NAME = "kodemia"

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

server.use(express.json())

server.get("/" , (request, response )=>{
    response.json({
        message:"API whit Mongoose"
    })
})

server.get("/koders", async (request, response)=>{
    try{
        //Destructuring
        const {gender, age, is_min_age ,generation} = request.query 

        const filters = {}

        if(gender) filters.gender = gender
        if(age){
            if(JSON.parse(is_min_age)){
                filters.age = {$gte: parseInt(age)}
            }else{
                filters.age = parseInt(age)
            }
        } 
        if(generation) filters.generation = generation

        const koders = await Koder.find(filters)
  
        response.json({
            succsess: true,
            message:"All koders of DB",
            data: {
                koders
            }
        })

    }catch(error){
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })

    } 
})
//POST/koders
server.post("/koders", async (request,response)=>{
    try {
        const newKoder = request.body

        const koderCreated = await Koder.create(newKoder)

        response.json({
            success: true,
            message: "Koder created",
            data:{
                koder: koderCreated
            }
        })
        
    } catch(error){
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }

    
})


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}) //primero se conecta a la base de datos
.then(async (connection) =>{
    console.log("DB Connected ^^", connection)
    server.listen(8080,()=>{ //despues inicializa el servidor
        console.log("Server lintening!!")
    })
})
.catch(error =>{
    console.log("Error:", error )
})