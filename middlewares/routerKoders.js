const { request, response } = require("express")
const express = require("express")

const router = express.Router()

////middleware a nivel de router
router.use((request, response, next)=>{
    console.log("Middleware en el router de koders")
    next()
})

router.get("/", (request, response)=>{
    response.json({
        message: "Get all koders"
    })
})

router.post("/", (request, response)=>{
    response.json({
        message: "Create koder"
    })
})





module.exports = router