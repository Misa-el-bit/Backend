const { request } = require("express")
const express = require("express")
const { response } = require("../server")
const mentors = require("../usecases/mentors")
const router = express.Router()

//GET
router.get("/", async(request, response)=>{
    try {
        const allMentors = await mentors.getAll()
        response.json({
            success: true,
            message: "Got All Mentors",
            data:{
                mentors: allMentors
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al obtener a los mentores",
            error: error.message
        })
    }
})

//GET by Id
router.get("/:id", async (request, response)=>{
    try {
        const {id} = request.params
        const mentorById = await mentors.getById(id)
        response.json({
            success: true,
            message: "Mentor found",
            data:{
                mentors: mentorById
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al obtener el mentor ",
            error: error.message
        })
    }
})

//POST
router.post("/", async (request, response)=>{
    try{
        const mentorData = request.body
        const mentorCreated = await mentors.create(mentorData)
        response.json({
            success: true, 
            messagge: "Mentor created",
            data:{
                mentor: mentorCreated
            }
        })
    }catch(error){
        response.status(400)
        response.json({
            success: false,
            message: "Error al creal al mentor",
            error: error.message
        })
    }
    
})

//PATCH by Id
router.patch("/:id", async (request, response)=>{
    try {
        const {id} = request.params
        const newDataMentor = request.body
        const mentorUpdated = await mentors.updateById(id, newDataMentor)
        response.json({
            success: true,
            message: "Mentor updated",
            data:{
                mentors: mentorUpdated
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al actualizar al mentor",
            error: error.message
        })
    }
})

//DELETE by Id
router.delete("/:id", async (request, response)=>{
    try {
        const {id} = request.params
        const mentorDeleted = await mentors.deleteById(id)
        response.json({
            success: true,
            message: "Koder Deleted",
            data:{
                mentors: mentorDeleted
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Error al borra al mentor",
            error: error.message
        })
    }
})

module.exports = router