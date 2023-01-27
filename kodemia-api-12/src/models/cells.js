const mongoose = require("mongoose")

const cellSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: 2, 
        maxLength: 50, 
        required: true,
        trim: true
    },
    mentors:[{
        type : mongoose.Schema.Types.ObjectId, //para identificar por Id
        ref: "mentors" // hace la referencia a la colleccion
    }]
})

const model = mongoose.model("cells", cellSchema)

module.exports = model