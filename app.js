require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require("express")

 


const authRouter = require("./route/authRouter");
const catchAsync = require('./utils/catchAsync');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json("Hello from Get Api")
})


app.use("/api/v1/auth",authRouter)


app.use("*", catchAsync(async(req,res,next)=>{
    // res.status(400).json({
    //     status : "fail",
    //     message : "No such Route existss"
    // })
    throw new Error("No route existssss")
}))


app.use(globalErrorHandler)



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on Port ${process.env.PORT}`)
})