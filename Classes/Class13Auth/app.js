import express, { urlencoded } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import userModel from "./models/AuthModels/authmodel.js";
import dotenv from "dotenv"


const app = express()

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended : true}))
dotenv.config()

const PORT = process.env.PORT || 5000;
const URI = process.env.URI;

mongoose.connect(URI)
.then(()=>console.log("mongo connected"))
.catch((err)=>console.log("error" , err))

//SIGNUP
app.post("/" , async(req , res)=>{

    const userEmail =req.body.email;

    const existEmail =await userModel.findOne({email : userEmail})
    if(existEmail){
      res.json({
          message : "user already Exist"
      })
      return
    }
   
    const hashPass = bcrypt.hashSync(req.body.password)
    
    const body = {...req.body , password : hashPass }

    const signUp =await userModel.create(body)
    
    res.json({
        status : true,
        mesage :"Done",
        data :  signUp
    })
})


app.listen(PORT , ()=>{
console.log(`Server is running on http://localhost:${PORT}`);
})