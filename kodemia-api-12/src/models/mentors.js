const mongoose = require("mongoose")

//Schema
const mentorSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: 2,
        maxLength: 50, 
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
        trim: true
    },
    module: [
        {
            type: String,
            enum:["Hello Koders","Maquetado","Js", "Backend", "React", "Cloud" ],
            required: true
        }
    ],
    gender:{
        type: String,
        enum: ["m", "f"],
        required: true 
    }
})

//Model 
const model = mongoose.model("mentors", mentorSchema)

module.exports = model