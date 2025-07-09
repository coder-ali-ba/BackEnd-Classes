import express, { json, urlencoded } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import userModel from "./models/AuthModels/authmodel.js";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { checkAuth } from "./middleWares/authMiddleware.js";


const app = express()

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended : true}))
dotenv.config()

const PORT = process.env.PORT || 5000;
const URI = process.env.URI;
const PRIVATEKEY = process.env.PRIVATEKEY;

mongoose.connect(URI)
.then(()=>console.log("mongo connected"))
.catch((err)=>console.log("error" , err))

//SIGNUP
app.post("/signup" , async(req , res)=>{

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

//LOGIN
app.post("/login" , async(request , response)=>{
    try {
        const loginEmail = request.body;
        const isExist = await userModel.findOne({email : loginEmail.email})     
        if(!isExist){

            return response.json({
              status : false,
              message :"invalid email or password"
            })
        }

        const pasCompare = await bcrypt.compare(loginEmail.password , isExist.password)

        if(!pasCompare){
            return response.json({
              status : false,
              message :"invalid email or password"
            })
        }


        const token = jwt.sign({id : loginEmail._id} , PRIVATEKEY)

         response.json({
            status : true,
            message: "user Successfully loggedIN",
            token : token
         })

    } catch (error) {
        response.json({
            status : false,
            message : "something went wrong",
        })
        
    }
})

//CREATE SOME AUTHENTICATION
app.post("/create" , checkAuth, (req , res)=>{

    res.json({
        status : true,
        message: "Created Successfully"
    })
})



app.listen(PORT , ()=>{
console.log(`Server is running on http://localhost:${PORT}`);
})