const { response } = require("express")
const express = require("express")
const fs = require("fs") //se importa el modulo de file-system
const { request } = require("http")
const kodersRouter = require("./routers/koders")
const mentorsRouter = require("./routers/mentors")
// tener acceso al server - instanciar express
const server = express()

const objectKodemia = JSON.parse(fs.readFileSync("./kodemia.json")) // esto regresa el contenido del archivo y se usa JSON.parse para conventirlo a un objeto
//console.log("object:", objectKodemia.koders)

//funcion promificada para leer un archivo 

function readFilePromise(pathToRead){
    return new Promise((resolve, reject) => {
        fs.readFile(pathToRead, "utf-8",(error, content) =>{
            if(error){
                reject(error)    
            }else{
                const json = JSON.parse(content)//esto convierte el string a Json
                resolve(json)
            }  
        })
    })
}

//middleware
server.use(express.json()) // esto parseara todo lo que se encuentre en el body del paquete a formato json
server.use("/koders", kodersRouter)
server.use("/mentors", mentorsRouter)

//GET
server.get('/', (request, response) => { //validá la peticion y el path
  response.write("Hola mundo desde Express")
  response.end()
})
// server.get('/koders', (request, response) => { //validá la peticion y el path
//     response.setHeader("Content-Type", "application/json") //se setea el header
//     const responseObj = {message: "hola"} //se determina el mensaje a enviar

//     response.write(JSON.stringify(responseObj)) // se convierte el objeto a string  
//     response.end()
// })

//endpoint
server.get('/mentor', (request, response) => { //validá la peticion y el path
    response.setHeader("Content-Type", "application/json")
    const responseObj = {message: "Aquí encontraras a los mentores"} //se determina el mensaje a enviar

    response.write(JSON.stringify(responseObj)) // se convierte el objeto a string  
    response.end()
})
// version simplificada
server.get('/mentor', (request, response) => { 
    response.status(201).json({ //al mismo tiempo se puede setear el status
        message: "Aquí encontraras a los mentores"
    })
})

server.post('/mentor', (request, response) => { //validá la peticion y el path
    const body = request.body
    console.log("Body:", body)

    response.status(201).json({ //al mismo tiempo se puede setear el status
        message: "Aquí podras crear un mentor"
    })
})

// GET con promesas
server.get("/read", (request, response) => { 
    readFilePromise("kodemia.json")
        .then((content) => {
            const contentObject = JSON.parse(content)
            response.json({
                koders:contentObject.koders
            })
        })
        .catch((error)=>{
            response.status(400).json({error: "No se pudo leer el archivo"})
        })
})

// // GET con Async/Await
// server.get("/koders", async (request, response) =>{
//     const content = await readFilePromise("kodemia.json") //fs.promises.readFile("kodemia.json", "utf-8")
//     //console.log(content)
//     response.status(200).json({
//         success: true,
//         message: "All koders",
//         data:{
//             koders: content.koders
//         }
//     })
// })

// // GET con Query params
// server.get("/koders", async (request, response) =>{
//     const {generation, gender, name} = request.query
//     const content = await readFilePromise("kodemia.json") //fs.promises.readFile("kodemia.json", "utf-8")
    
//     let kodersData = content.koders

//     if(generation){
//         kodersData = kodersData.filter(koder => koder.generation === parseInt(generation))
//     }

//     if(gender){
//         kodersData = kodersData.filter(koder => koder.gender === gender)
//     }

//     if(name){
//         kodersData = kodersData.filter(koder => koder.name === name)
//     }
//     content.koders = kodersData || content.koders

//     response.status(200).json({
//         success: true,
//         message: "All koders",
//         data:{
//             koders: content.koders
//         }
//     })
// })

// // GET by ID
// server.get("/koders/:id", async (request, response)=>{
//     const { id } = request.params
//     const content = await readFilePromise("kodemia.json")

//     const koderById = content.koders.find(koder => koder.id === parseInt(id))

//     if(!koderById){
//         response.status(404)
//         response.json({
//             success: false,
//             message: "Koder Not Found"
//         })
//     }else{
//         response.status(200)
//         response.json({
//             success: true,
//             message: 'KoderFound',
//             data: {
//                 koder: koderById
//             }
//         })
//     }
// })

// // POST con Async/Await
// server.post("/koders", async(request, response)=>{
//     const newKoder = request.body
//     const content = await readFilePromise("kodemia.json")

//     content.koders.push(newKoder) //agrear un nuevo koder al objeto koders
    
//     fs.writeFileSync("kodemia.json", JSON.stringify(content, null, 2),"utf-8") // escribir el archivo, el 2 se refiere al número de espacios que se desean en el formato del json
//     response.status(201)
//     response.json({
//         success: true,
//         message: "Koder Agregado",
//         data:{
//             koders: newKoder
//         }
//     })
// })

// //sintaxis universal
// //METHOD/recurso/identificador
// //PATCH/koders/:id
// //PATCH con Async/Await
// server.patch("/koders/:id" , async (request,response)=>{
//     //const id = request.params.id
//     const { id } = request.params //destructuracion
//     const { name, generation } = request.body
//     const content = await readFilePromise("kodemia.json")

//     const newKoders = content.koders.map((koder)=>{
//         if(koder.id === parseInt(id)){
//             koder.name = name
//             koder.generation = generation
//             //koder = {... koder, name, generation} //spread operator es equivalente a las lineas de arriba
//         }
//         return koder
//     })
//     content.koders = newKoders
//     fs.writeFileSync("kodemia.json", JSON.stringify(content, null, 2),"utf-8") //escribir el archivo 
//     response.status(200)
//     response.json({
//         success: true,
//         message: "Koder Updated"
//     })
    
// })

// // DELETE id
// server.delete("/koders/:id", async (request, response) => {
//     const { id } = request.params
//     const content = await readFilePromise("kodemia.json")

//     const kodersFiltered = content.koders.filter(koder => koder.id !== parseInt(id))
//     content.koders = kodersFiltered
//     fs.writeFileSync("kodemia.json", JSON.stringify(content, null, 2),"utf-8")
//     response.json({
//         success: true,
//         message: "Deleted"
//     })
// })

server.listen(8080, () => {
  console.log("listening on port : 8080")
})