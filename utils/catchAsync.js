const catchAsync = (fn)=>{
    const errorHandler = (req,res,next)=>{

        console.log(req.body,"reqqqqqqqqqqqqqqq")
        fn(req,res,next).catch(next)
    }

    return errorHandler
}

module.exports = catchAsync;