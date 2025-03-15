import express, { response } from "express"
import mongoose from "mongoose";
import UserModel from "./models/userSchema.js";
const app =express()
const PORT = 5000;

app.use(express.json())
app.use(express.urlencoded({extended : true}))
const URI =`mongodb+srv://aliba:liaba@cluster0.yi66g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


mongoose.connect(URI) 
.then(()=>{
    console.log("MONGO DB CONNECTED");
    
})
.catch((err)=>{
    console.log("MOngo DB   not connected", err.message);
    
})



//Create DATA
app.post("/createuser", async(request, response)=>{
// console.log(request.body);
try {
    const userResponse =await UserModel.create(request.body) ;
    console.log("response ",response);
    response.json({
        message : "user Created",
        data : userResponse
    })
} catch (error) {
    console.log("error", error.message);
    response.json({
        message : error.message || "something went wrong",
        data : null
    })
}


})

//Get Users
app.get("/getAllUser", async(request , response)=>{
    try {
       const userResponse = await UserModel.find();
       response.json({
        message : "fetch all users ",
        data : userResponse
       })
        
    } catch (error) {
        response.json({
            message : error.message || "something Went Wrong"
        })
    }
})

//Update User
app.post("/updateUser/:id", async (req, res)=>{
console.log(req.params.id)
const userId = req.params.id;
const Body= req.body;

const Update = await UserModel.findByIdAndUpdate(userId , Body, { new : true});
res.json({
    message : "responseUpdated",
    data : Update
})

})

//Delete User
app.post("/deleteUser/:id", async (req, res)=>{
    // console.log(req.params.id)
    const userId = req.params.id;
    // const Body= req.body;
    
    const deleted = await UserModel.findByIdAndDelete(userId);
    res.json({
        message : "responseUpdated",
        data :null
    })
    
    })
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})