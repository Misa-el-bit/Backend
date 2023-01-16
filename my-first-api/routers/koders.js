const express = require("express")
const router = express.Router()
const fs = require("fs")

// función promificada para leer un archivo
function readFilePromise(pathToRead) {
    return new Promise((resolve, reject) => {
        fs.readFile(pathToRead, 'utf8', (err, content) => {
            if (err) {
                reject(err)
            }else {
                const json = JSON.parse(content) // de un string a un objeto
                resolve(json)
            }
        })
    })
}
// GET con Async/Await
router.get("/", async (request, response) =>{
    const content = await readFilePromise("kodemia.json") //fs.promises.readFile("kodemia.json", "utf-8")
    //console.log(content)
    response.status(200).json({
        success: true,
        message: "All koders",
        data:{
            koders: content.koders
        }
    })
})

//GET Query params
router.get("/", async (request, response)=>{
    const {generation, gender, name, count} = request.query
    console.log(count)
    const content = await readFilePromise('kodemia.json') //fs.promises.readFile("kodemia.json", "utf-8")

    let kodersData = content.koders

    if(generation){
        kodersData = kodersData.filter(koder => koder.generation === parseInt(generation))
    }

    if(gender){
        kodersData = kodersData.filter(koder => koder.gender === gender)
    }

    if(name){
        kodersData = kodersData.filter(koder => koder.name === name)
    }

    if(count){
        kodersData = kodersData.slice(0, parseInt(count))
    }

    content.koders = kodersData || content.koders

    response.status(200).json({
        success: true,
        message: "All koders",
        data:{
            koders: content.koders
        }
    })

})

// GET by ID
router.get("/:id", async (request, response)=>{
    const { id } = request.params
    const content = await readFilePromise("kodemia.json")

    const koderById = content.koders.find(koder => koder.id === parseInt(id))

    if(!koderById){
        response.status(404)
        response.json({
            success: false,
            message: "Koder Not Found"
        })
    }else{
        response.status(200)
        response.json({
            success: true,
            message: 'KoderFound',
            data: {
                koder: koderById
            }
        })
    }
})

//POST Router Async/Await
router.post("/", async(request, response)=>{
    const newKoder = request.body
    const content = await readFilePromise("kodemia.json")

    content.koders.push(newKoder) //agrear un nuevo koder al objeto koders

    fs.writeFileSync("kodemia.json", JSON.stringify(content, null, 2),"utf-8") // escribir el archivo, el 2 se refiere al número de espacios que se desean en el formato del json
    
    response.status(201)
    response.json({
        success: true,
        message: "Koder Added",
        data:{
            koders: newKoder
        }
    })
})

// PATCH by ID
//sintaxis universal
//METHOD/recurso/identificador
//PATCH/koders/:id
router.patch("/:id" , async (request,response)=>{
    //const id = request.params.id
    const { id } = request.params //destructuracion
    const { name, generation } = request.body

    const content = await readFilePromise("kodemia.json")

    const newKoders = content.koders.map((koder)=>{
        if(koder.id === parseInt(id)){
            if(!name){
                koder = {...koder, generation}
            }else if(!generation){
                koder = {...koder,name}
            }else{
                koder = {...koder,name, generation}
            }
        }
        return koder
    })
    content.koders = newKoders

    fs.writeFileSync("kodemia.json", JSON.stringify(content, null, 2),"utf-8") //escribir el archivo 

    response.status(200)
    response.json({
        success: true,
        message: "Koder Updated"
    })
    
})

//DELETE by ID
router.delete("/:id", async (request, response) => {
    const { id } = request.params
    const content = await readFilePromise("kodemia.json")

    const kodersFiltered = content.koders.filter(koder => koder.id !== parseInt(id))

    content.koders = kodersFiltered

    fs.writeFileSync("kodemia.json", JSON.stringify(content, null, 2),"utf-8")

    response.json({
        success: true,
        message: "Deleted"
    })
})

module.exports = router