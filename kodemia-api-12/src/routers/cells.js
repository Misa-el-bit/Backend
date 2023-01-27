const express = require("express")
const { request } = require("../server")
const cells = require("../usecases/cells")
const router = express.Router()

//GET
router.get("/", async (request, response)=>{
    try {
        const allCells = await cells.getAll()
        response.json({
            success: true,
            message: "All cells",
            data:{
                cells: allCells
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al obtener las cellula",
            error: error.message
        })
    }
})

//GET by Id
router.get("/:id", async(request, response)=>{
    try {
        const {id} = request.params
        const cellById = await cells.getById(id)
        response.json({
            success: true,
            message: "Cell founded",
            data:{
                cells: cellById
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al obtener la celula",
            error: error.message
        })
    }
})

//POST
router.post("/", async(request, response)=>{
    try {
        const cellData = request.body
        const cellCreated = await cells.create(cellData)
        response.json({
            success: true,
            message: "Celula creada",
            data:{
                cell: cellCreated
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            massage: "Error al crear la celula",
            error: error.message
        })
    }
})

//PATCH by Id
router.patch("/:id", async (request, response)=>{
    try {
        const {id} = request.params
        const newDataCell = request.body
        const cellUpdated = await cells.updateById(id, newDataCell)
        response.json({
            success: true,
            message: "Célula updated",
            data:{
                cells: cellUpdated
            }
        })  
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al actualizar la celula",
            error: error.massage
        })
    }
})

//DELETE by Id
router.delete("/:id", async (request, response)=>{
    try {
        const {id} = request.params
        const cellDeleted = await cells.deleteById(id)
        response.json({
            success: true,
            message: "Celula deleted",
            data:{
                cells: cellDeleted
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al eliminar la celula",
            error: error.message
        })
    }
})

module.exports = router