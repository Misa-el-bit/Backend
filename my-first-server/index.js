const http = require("http"); // se requiere el modulo http y se asigna a una constante

const server = http.createServer((request, response)=>{ //se declara una nueva constante para crear el servidor
    //console.log("path:", request.url)
    //console.log("method", request.method)
    
    if(request.method == "GET" && request.url == "/mentors"){
        response.write("Aquí encontraras a los mentores")
    }else if(request.method == "POST" && request.url == "/mentors"){
        response.write("Aquí podras crear a un mentor")
    }
    else{
        response.write("No se esperaba esto")
    }
    //response.write("Hola desde mi servidor Node") // se crean los response
    response.end()
})

server.listen(8080,() => { //se monta a escucha en un puerto
    console.log("Server running in http://localhost:8080")
})

/*
validar una url

URL -> /mentors
GET /mentors -> "Aquí encontraras a los mentores"
POST /mentors -> "Aquí podras crear a un mentor"
-> "No se esperaba esto"
*/
