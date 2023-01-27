//Variables de entorno
require('dotenv').config() //cargara todas las variables de entorno cuando se inicialice la app
//inicialisar el servidor 
const server = require("./src/server")
const dbConnect = require("./src/lib/db")

//conexion a la BD
dbConnect()
.then(()=>{
    console.log("Datbase connected")
    server.listen(8080,() =>{
        console.log("Server listening...")
    })
})
.catch(error => console.error(error))


