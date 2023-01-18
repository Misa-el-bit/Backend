const mongoose = require("mongoose") // se importa el modulo de mongoose

//Variables de entorno
const DB_USER = "Misa-el"
const DB_PASSWORD = "Scarface1*"
const DB_HOST = "kodemia-12va.8gcqb.mongodb.net"
const DB_NAME = "kodemia"

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

//Schema
const koderSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: 2,
        maxLength: 50,
        require: true,
        trim: true // trim elimina los espacios al principio y al final 
    },
    lastName:{
        type: String,
        minLength: 2,
        maxLength: 50,
        require: true,
        trim: true
    },
    gender:{
        type: String,
        enum: ["m", "f"], //enum indica que solo 1 de esos valores puede ser admitido
        require: true
    },
    generation:{
        type: Number,
        min: 1,
        require: true
    },
    age:{
        type: Number,
        min: 0,
        max: 90,
        require: true
    }
})

//Model
const Koder = mongoose.model("koders", koderSchema)


//manejo con una promesa
// mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}) //permite implemantar nuevas actualizaciones de mongoose
// .then((connection) =>{
//     console.log("DB Connected ^^", connection)

//     Koder.find({})
//     .then((koders)=>{
//         console.log(koders)
//     })
//     .catch(error =>{
//         console.log("Error:", error)
//     })
// })
// .catch(error =>{
//     console.log("Error:", error )
// })

//manejo con Async/Await
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}) //permite implemantar nuevas actualizaciones de mongoose
.then(async (connection) =>{
    console.log("DB Connected ^^", connection)

    // const koders = await Koder.find({})
    // console.log(koders)

    const koderCreated = await Koder.create({name: "Alfred", lastName: "Pizaña", gender: "m", generation: 12, age: 27 })
    console.log(koderCreated)
})
.catch(error =>{
    console.log("Error:", error )
})
