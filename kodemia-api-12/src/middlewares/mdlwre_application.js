function middlewareLog(request,response,next){
    const {method, url, body} = request
    console.log(`Method:${method}, Url:${url}, Body:${JSON.stringify(body)}`)
    next()
}

module.exports = middlewareLog
