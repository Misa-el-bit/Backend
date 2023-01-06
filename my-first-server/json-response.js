const http = require ("http")

const server = http.createServer((request, response)=>{
    response.setHeader("Content-Type", "aplicattion/json") //se setea el header
    const jsonResponse = {message: "Hola koders"}
    const jsonString = JSON.stringify(jsonResponse)

    response.write(jsonString)
    response.end()
})

server.listen(8080,()=>{
    console.log("server running in http://localhost:8080")
})