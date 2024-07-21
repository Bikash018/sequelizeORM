const user = require("../db/models/user");

const signUp = async (req,res,next)=>{
   const body =  req.body

   console.log(req.body,"reqqqqqqq")

   if(!['1','2'].includes(body.userType)){
       return res.status(400).json({
        status : "fail",
        message : "invalid user Type"
       });
   }

   const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword : body.confirmPassword
    

   })

   if(!newUser){
    return res.status(400).json({
        status : "fail",
        message : "Failed to create the user"
       });
   }

   return res.status(201).json({
    status :"success",
    data : newUser
   })



}

module.exports = {signUp};