import express, { response, urlencoded } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userModel from './modrls/models.js'

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
        const createUser = await userModel.create(body)
        
        console.log(createUser);
        

        console.log(body);
        response.json({
            data : createUser,
            message : "ho gaya"
        })
        
    } catch (error) {
        response.json ({
            message : error.message || "something went wrong"
        })
    }
})



app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);  
})