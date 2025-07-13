import express, { json } from "express";
import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";
import auths from "./models/userModel/userModel.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import AuthCheck from "./MiddleWares/authMiddleWare.js";
import cors from "cors"





dotenv.config()

const PORT = process.env.PORT || 5050
const PRIVATEKEY =process.env.PRIVATEKEY
const URI = process.env.URI





mongoose.connect(URI)
.then(()=>console.log("Connected"))
.catch(()=>console.log("connection Error"))



const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended :true}))


app.post("/signup" , async (req , res)=>{
    const body = req.body;
    const isExist = await auths.findOne({email : body.email})
    if(isExist){
        return res.json({
            status : false,
            message :"User ALready Exist"
        })
    }
    const pass =await bcrypt.hash(body.password , 10)
    const user = {...body , password : pass}

    const allUsers = await auths.create(user)

    res.json({
        status : true,
        message :"Signed Up Successfully",
        data : allUsers
    })
})

app.post ("/login" , async(req , res)=>{

try {
    const body = req.body
    const isExist = await auths.findOne({email : body.email})
    if(!isExist){
        return res.json({
            status : false,
            message: "Invalid emial or password"
        })}

    const isPass = await bcrypt.compare(body.password , isExist.password)
    if(!isPass){
        return res.json({
            status : false,
            message: "Invalid emial or password"
        })
    }
    
    const token = jwt.sign({id : isExist._id} , PRIVATEKEY)
    res.json({
        status : true,
        message : "Loged In Successfully",
        token : token
    })
        
} catch (error) {
        res.json({
            status: false,
            message : "Something went Wrong"
        })
}


})


app.post("/create" , AuthCheck ,  (req , res)=>{
    res.json({
        status : true,
        message : "Created Successfully"
    })
})



app.listen(PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})