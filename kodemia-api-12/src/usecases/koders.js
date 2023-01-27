//importar el modelo
const Koder = require("../models/koders")
const bcrypt = require("../lib/bcrypt")
const { Error } = require("mongoose")

//2- Crear el caso de uso necesario

//GET
function getAll(){
    return Koder.find()
}
//GET by id
function getById(id){
    return Koder.findById(id)
}
//POST
async function create(koderData){
    const {email, password} = koderData
    const koderFound = await Koder.findOne({email}) //Busca el email para verificar que el email no este registrado ya
    if(koderFound) throw new Error("Email already exist") //Lanzar el error en caso de que ya este registrado el correo
    //Encriptar el password
    const encryptedPassword =  await bcrypt.hash(password)
    return Koder.create({...koderData, password: encryptedPassword}) //Se hace una copia de lo que contenga el objeto koderData pero a la propiedad password se le da el valor obtenido de encryptedPassword
    //return Koder.create(koderData)
}
//PATCH by Id
function updateById(id, newData){
    return Koder.findByIdAndUpdate(id, newData, {new: true})
}
//DELETE by Id
function deleteById(id){
    return Koder.findByIdAndDelete(id)
}

module.exports = {
    getAll,
    getById,
    create, 
    updateById,
    deleteById
}