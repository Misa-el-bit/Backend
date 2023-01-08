const { error } = require("console")
const fs = require("fs") // se importa el modulo de file-system

const callback = (error ) =>{
    if(error){
        console.error(error)
    }else{
        console.log("The file has been saved")
    }
}

// escribir un archivo 
fs.writeFile("message.txt", "Hello Node.Js", "utf8",callback)

// leer un archivo 
fs.readFile("message.txt", "utf8",(error,data) =>{
    if(error){
        console.error(error)
    }else{
        console.log(data)
    }
})

//actualizar un archivo 
fs.appendFile("message.txt", "another string", "utf-8", (error)=>{
    if(error){
        console.error(error)
    }else{
        console.log("file modified successfuly")
    }
})

//remover un archivo 
fs.unlink("message.txt", (error)=>{
    if(error){
        console.error(error)
    }else{
        console.log("File removed successfuly")
    }
})

//copiar un archivo 
fs.copyFile("message.txt", "anothermessage.txt", (error)=>{
    if(error){
        console.error(error)
    }else{
        console.log("file copied successfuly")
    }
})