const jwt = require("jsonwebtoken")

const {JWT_SECRET} = process.env

//funcion para firmarse
function sign(payload){
    return jwt.sign(payload, JWT_SECRET, {expiresIn: "1d"})
}

//funcion de verificacion
function verify (token){
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    ...jwt,
    sign,
    verify
}