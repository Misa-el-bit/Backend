const Koder = require("../models/koders")
const bcrypt = require("../lib/bcrypt")
const jwt = require("../lib/jwt")

async function login(email, password){
    const koderFound = await Koder.findOne({email}) //buscar el usuario(koder) por email
    if(!koderFound) throw new Error("Invalid Credentials") //Valida si no se encuentra registrado el email
    const isValidPassword = await bcrypt.compare(password, koderFound.password) 
    if(!isValidPassword) throw new Error("Invalid Credentials") //compara el password de texto plano con el encriptado que se encuentra guardado
    //regresar el Token 
    return jwt.sign({id: koderFound._id})

}

module.exports = {
    login
}