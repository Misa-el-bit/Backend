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

//GET Query params
router.get("/", async (request, response)=>{
    const {module, name, count} = request.query
    console.log(count)
    const content = await readFilePromise('kodemia.json')

    let mentorsData = content.mentors

    if(module){
        mentorsData = mentorsData.filter(mentor => mentor.module === module)
    }

    if(name){
        mentorsData = mentorsData.filter(mentor => mentor.name === name)
    }

    if(count){
        mentorsData = mentorsData.slice(0, parseInt(count))
    }

    content.mentors = mentorsData || content.mentors

    response.status(200).json({
        success: true,
        message: "All Mentors",
        data:{
            mentors: content.mentors
        }
    })

})

// GET by ID
router.get("/:id", async (request, response)=>{
    const { id } = request.params
    const content = await readFilePromise("kodemia.json")

    const mentorById = content.mentor.find(mentor => mentor.id === parseInt(id))

    if(!mentorById){
        response.status(404)
        response.json({
            success: false,
            message: "Mentor Not Found"
        })
    }else{
        response.status(200)
        response.json({
            success: true,
            message: 'Mentor Found',
            data: {
                mentor: mentorById
            }
        })
    }
})

//POST Router
router.post("/", async(request, response)=>{
    const newMentor = request.body
    const content = await readFilePromise("kodemia.json")

    content.mentors.push(newMentor) //agrear un nuevo koder al objeto koders

    fs.writeFileSync("kodemia.json", JSON.stringify(content, null, 2),"utf-8") // escribir el archivo, el 2 se refiere al número de espacios que se desean en el formato del json
    
    response.status(201)
    response.json({
        success: true,
        message: "Mentor Added",
        data:{
            mentors: newMentor
        }
    })
})

// PATCH by ID
router.patch("/:id" , async (request,response)=>{
    //const id = request.params.id
    const { id } = request.params //destructuracion
    const { name, module } = request.body

    const content = await readFilePromise("kodemia.json")

    const newMentors = content.mentors.map((mentor)=>{
        if(mentor.id === parseInt(id)){
            if(!name){
                mentor = {...mentor, module}
            }else if(!module){
                mentor = {...mentor,name}
            }else{
                mentor = {...mentor,name, module}
            }
        }
        return mentor
    })
    content.mentors = newMentors

    fs.writeFileSync("kodemia.json", JSON.stringify(content, null, 2),"utf-8") //escribir el archivo 

    response.status(200)
    response.json({
        success: true,
        message: "Mentor Updated"
    })
    
})

//DELETE by ID
router.delete("/:id", async (request, response) => {
    const { id } = request.params
    const content = await readFilePromise("kodemia.json")

    const mentorsFiltered = content.mentors.filter(mentor => mentor.id !== parseInt(id))

    content.mentors = mentorsFiltered

    fs.writeFileSync("kodemia.json", JSON.stringify(content, null, 2),"utf-8")

    response.json({
        success: true,
        message: "Deleted"
    })
})

module.exports = router