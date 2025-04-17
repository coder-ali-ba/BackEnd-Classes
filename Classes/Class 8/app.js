import express, { json, response, urlencoded } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userModel from './modrls/models.js'
import bcrypt from 'bcryptjs'

const app =express()
app.use(express.json())
app.use(urlencoded({extended : true}))
app.use(cors())

const PORT =process.env.PORT || 5000

const URI =`mongodb+srv://aliba:liaba@cluster0.yi66g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(URI) 
.then(()=>{
    console.log("MONGO DB CONNECTED");
    
})
.catch((err)=>{
    console.log("MOngo DB   not connected", err.message);
    
})


// User SignUP
app.post("/signup", async(request , response) => {
    try {
        const body = request.body 
        const samUser = await userModel.findOne({
            email : body.email
        })

        if(samUser){
            return response.json({
                        data : null,
                         message : "User already exists"
             })
        }
        const userPassword = body.password
        const hashPass = await bcrypt.hash(userPassword , 10)
        const obj = {
            ...body,
            password : hashPass
        }
        const UserSignUp = userModel.create(obj)
        response.json({
            data : UserSignUp,
            message : "user Signed Up",
            status : true
        })  
      } catch (error) {
        response.json ({
            message : error.message || "something went wrong",
            status : false
        })
    }
})


app.post("/login" , async(request , response) => {
    try {
        const {email , password} = request.body
        const user = await userModel.findOne({email})
        if(!user){
           return  response.json({
                message : "login failed",
                data : null
            }) 
        }  
        const comPass =await bcrypt.compare(password , user.password)
        if(!comPass){
            return  response.json({
                message : "login failed",
                data : null
            }) 
           
           }
        
           response.json({
            message : "logedIn",
            data : user
        })

       
    } catch (error) {
        response.json({
            data : null,
            message : "something went wrong"
        })
    }
})



app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);  
})