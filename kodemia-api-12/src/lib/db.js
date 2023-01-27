// crear una funcion que haga la conexion a la db
const mongoose = require("mongoose")

//Variables de entorno
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

function connect (){
    return mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports = connect