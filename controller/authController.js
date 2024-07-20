const signUp = (req,res,next)=>{
    res.json({
        status: "success",
        message : "Signup router are working"
    })
}

module.exports = {signUp};