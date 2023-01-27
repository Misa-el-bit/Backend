const Cell = require("../models/cells")

//GET
function getAll(){
    return Cell.find().populate("mentors")
}
//GET by Id
function getById(id){
    return Cell.findById(id).populate("mentors")
} 
//POST
function create(cellData){
    return Cell.create(cellData)
}
//PATCH by Id
function updateById(id, newData){
    return Cell.findByIdAndUpdate(id, newData, {new: true, runValidators: true }).populate("mentors")
}
//Delete by Id
function deleteById(id){
    return Cell.findByIdAndDelete(id).populate("mentors")
} 

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}