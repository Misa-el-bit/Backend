const express = require("express")
const auths = require("../usecases/auth")
const router = express.Router()

router.post("/login", async(request, response) =>{
    try {
        const {email, password} = request.body
        const token = await auths.login(email, password)
        response.json({
            success: true,
            message: "Koder logged In",
            data:{
                token
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Couldn't log in",
            error: error.message
        })
    }
})

module.exports = router