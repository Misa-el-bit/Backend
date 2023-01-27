//importar el modelo
const Mentor = require("../models/mentors")

//GET
function getAll(){
    return Mentor.find()
}
//GET by Id
function getById(id){
    return Mentor.findById(id)
}
//POST
function create(mentorData){
    return Mentor.create(mentorData)
}
//PATCH by Id
function updateById(id, newData){
    return Mentor.findByIdAndUpdate(id, newData, {new: true, runValidators:true})
}
//DELETE by Id
function deleteById(id){
    return Mentor.findByIdAndDelete(id)
}
module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}