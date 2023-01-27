const express = require("express")
const { request, response } = require("../server")
const koders = require("../usecases/koders")
const router = express.Router()
const isAuth = require("../middlewares/auth")

//3- Crear el endpoint
router.get("/", isAuth, async (request, response)=>{
    try {
       const allKoders = await koders.getAll()
       response.json({
            success: true,
            message: "All Koders",
            data:{
                koders: allKoders
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al obtener los koders",
            error: error.message
        })
    }
})

//GET by Id
router.get("/:id", isAuth, async (request, response)=>{
    try {
        const {id} = request.params
        const koderById = await koders.getById(id)
        response.json({
            success: true,
            message: "Koder found",
            data:{
                koders: koderById
            }
        })   
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al obtener los koders",
            error: error.message
        })
    }
})

//POST
router.post("/", async(request, response)=>{
    try {
        const newKoder = request.body
        const koderCreated = await koders.create(newKoder)
        response.json({
            success: true,
            message: "Koder created",
            data:{
                koders: koderCreated
            }
        })
        
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al crear el koder",
            error: error.message
        })
    }
})
//PATCH by Id
router.patch("/:id", isAuth, async (request, response) => {
    try {
        const {id} = request.params
        const updateKoder = request.body
        const koderUpdated = await koders.updateById(id, updateKoder)
        response.json({
            success: true,
            message: "Koder updated",
            data:{
                koders: koderUpdated
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al actualizar el koder",
            error: error.message
        })
    }
})
//DELETE by Id
router.delete("/:id", isAuth, async (request, response)=>{
    try {
        const {id} = request.params
        const koderDeleted = await koders.deleteById(id)
        response.json({
            success: true,
            message: "Koder deleted",
            data:{
                koders: koderDeleted
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al borrar el koder",
            error: error.message
        })
    }
})


module.exports = router