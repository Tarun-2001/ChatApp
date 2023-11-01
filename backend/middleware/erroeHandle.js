const notFound = (req,res,next)=>{
    const error = new Error(`Not Found ${req.oiginalUrl}`)
    res.status(404)
    next(error)
}
const errorHandle = (err,req,res,next)=>{
    const statusCode = res.statusCode===200?500:res.statusCode
    res.status(statusCode);
    res.josn({
        message:err.message
    })
}


module.exports = {notFound,errorHandle}