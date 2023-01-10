//callback - funciones que se pasan como argumento dentro de otra función
function irACasa(avisar){
    console.log("yendo a casa..")
    console.log("llegue a casa")

    avisar()
}

function llamarACasa(){
    console.log("Ama ya llegue")
}

irACasa(llamarACasa)

// Promesas

//constructor

new Promise((resolve, reject)=>{ // resolve & reject son funciones que se definen en el callback
    const todoVaBien = true
    if(todoVaBien){
        resolve("ok") // resolve es una funcion que pasa la promesa de pendiente a resuelta
    }else{
        reject("not ok") // reject es una funcion que pasa la promesa de pendiente a rechazado
    }
})

// promesa
//     .then(()=>{ //then se ejecuta cuando la promesa se resuelve de forma satisfactoria

//     }) 
//     .catch(()=>{//catch se ejecuta cuando la promesa se rechaza

//     }) 

// ejemplo muro callbacks

// const ejemploMuro = {
//     construido: false,
//     aplanado: false,
//     pintado: false,
// }

// const tiempoDeEspera = 2000

// function construir(muro, callback){
//     setTimeout(() =>{
//         muro.construido = true
//         callback(muro)
//     }, tiempoDeEspera)
// }

// function aplanar(muro, callback){
//     setTimeout(() =>{
//         muro.aplanado = true
//         callback(muro)
//     }, tiempoDeEspera)
// }

// function pintar(muro, callback){
//     setTimeout(() =>{
//         muro.pintado = true
//         callback(muro)
//     }, tiempoDeEspera)
// }


// construir(ejemploMuro, (objeto) =>{ //callback
//     console.log("muroConstruido:", objeto)
// })

// aplanar(ejemploMuro, (objeto) =>{
//     console.log("muroAplanado:", objeto)
// })

// pintar(ejemploMuro, (objeto) =>{
//     console.log("muroPintado:", objeto)
// })

//promesas
const tiempoDeEspera = 2000

function construir (muro){
    // resultado de funcion
    return new Promise((resolve, reject)=>{ //se devuelve la promesa
        setTimeout(()=>{
            muro.construido = true
            if(muro.construido){
                resolve(muro)
            }else{
                reject("El muro no se construyó")
            }
        }, tiempoDeEspera)
    })
}
//
function aplanar (muro){
    // resultado de funcion
    return new Promise((resolve, reject)=>{ //se devuelve la promesa
        setTimeout(()=>{
            muro.aplanado = true
            if(muro.aplanado){
                resolve(muro)
            }else{
                reject("El muro no se aplano")
            }
        }, tiempoDeEspera)
    })
}
//
function pintar (muro){
    // resultado de funcion
    return new Promise((resolve, reject)=>{ //se devuelve la promesa
        setTimeout(()=>{
            muro.pintado = true
            if(muro.pintado){
                resolve(muro)
            }else{
                reject("El muro no se pinto")
            }
        }, tiempoDeEspera)
    })
}

// const promesaDeConstrucción = construir({})

// console.log("promesaDeConstrucción:", promesaDeConstrucción)

// promesaDeConstrucción
// .then(
//     (muroConstruido) => {
//         let promesaDeAplanado = aplanar(muroConstruido)
//         console.log("muroConstruido:", muroConstruido)

//         promesaDeAplanado
//         .then((muroAplanado) => {
//             console.log("muroAplanado:", muroAplanado)

//             let promesaDePintado = pintar(muroAplanado)

//             promesaDePintado
//             .then((muroPintado)=>{
//                 console.log("muroPintado:", muroPintado)
//             })
//             .catch((error)=>{
//                 console.error(error)
//             })
//         })
//     }
// ).catch((error) =>{
//     console.error(error)
// })

async function crearMuro(){
    const muro = await construir ({})
    const muroAplanado = await aplanar(muro)
    const muroPintado = await pintar(muroAplanado)

    console.log("muroConstruido:", muroPintado)
}
crearMuro()
