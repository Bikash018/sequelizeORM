const user = require("../db/models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const generateToken = (payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        expiresIn :process.env.JWT_EXPIRES_IN
    })
}

const signUp = async (req,res,next)=>{
   const body =  req.body

//    console.log(req.body,"reqqqqqqq")

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

   const result =newUser.toJSON();
   delete result.password
   delete result.deletedAt

   result.token = generateToken({
    id : result.id
   })


   if(!result){
    return res.status(400).json({
        status : "fail",
        message : "Failed to create the user"
       });
   }

   return res.status(201).json({
    status :"success",
    data : result
   })



}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status :  "fail",
            
        });
    }

    const result = await user.findOne({ where: { email } });
    if (!result || !(await bcrypt.compare(password, result.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = generateToken({
        id: result.id,
    });

    return res.json({
        status: 'success',
        token,
    });
};

module.exports = {signUp ,login };