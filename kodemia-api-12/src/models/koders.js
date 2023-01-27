const mongoose = require("mongoose")
//1- Asegurarnos que nuestro Modelo exista
//Schema
const koderSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
        trim: true // trim elimina los espacios al principio y al final 
    },
    lastName:{
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
        trim: true
    },
    gender:{
        type: String,
        enum: ["m", "f"], //enum indica que solo 1 de esos valores puede ser admitido
        required: true
    },
    generation:{
        type: Number,
        min: 1,
        required: true
    },
    age:{
        type: Number,
        min: 0,
        max: 90,
        required: true
    },
    email:{
        type: String,
        match: /.*@.*\..*/, // valida el email con regex
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

//Model
const model = mongoose.model("koders", koderSchema)

module.exports = model