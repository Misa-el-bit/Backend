const http = require("http");

const server = http.createServer((request, response)=>{
    if (request.url === "/mentors"){
        if(request.method === "POST"){
            response.write("Aquí podrás crear a un mentor")
        }else if (request.method === "GET"){
            response.write("Aquí encontrarás a los mentores de kodemia ")
        }else{
            response.write("No se esperaba esto")
        }
    } else{
        response.write("No se esperaba esto")
    }
    response.end()
})

server.listen(8080,() => {
    console.log("Server running in http://localhost:8080")
})