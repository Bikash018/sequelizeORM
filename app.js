require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require("express")

 


const authRouter = require("./route/authRouter")

const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json("Hello from Get Api")
})


app.use("/api/v1/auth",authRouter)



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on Port ${process.env.PORT}`)
})