

import express, { json, response } from 'express'
import fs from "fs"
import { get } from 'http';
import { v4 as uuidv4 } from 'uuid';
const app = express()
import cors from "cors"


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const port= 5000
app.get("/", (req, res)=>{
    res.send("Habib Ali")
})




app.post('/createuser', (req, res)=>{
      
    const fileexist = fs.existsSync('Users.txt');
    if(fileexist){
        //Append User
        const getFile= fs.readFileSync("Users.txt", "utf-8");
        const parsData = JSON.parse(getFile)
        parsData.push({...req.body, id : uuidv4()})
        fs.writeFileSync("Users.txt", JSON.stringify(parsData))
    }else{
        //Create User
        var users =[]
        users.push({...req.body, id : uuidv4()})
        fs.writeFileSync("Users.txt", JSON.stringify(users))
    }
    
    res.json({
        message : "Useer Created"
    }) 
})





app.get("/allUsers", (req, res)=>{

    const allUser=fs.readFileSync("Users.txt", 'utf-8')
    res.send(JSON.parse(allUser))
})



app.post("/updateUser/:id", (req, res)=>{
    const params = req.params
//    console.log(params.id);
   const getData = fs.readFileSync("Users.txt", "utf-8");
   const parseData= JSON.parse(getData)

   const updatedData = parseData.map((data)=>{
    if (data.id == params.id){
        return req.body
    }else{
        return data
    }

   
    
   })
   fs.writeFileSync("Users.txt", JSON.stringify(updatedData))
   res.send("updated")
    

})


app.post("/deleteUser/:userId", (request, response)=>{
    // console.log("resp", request.params.userId);
    const getData = fs.readFileSync("Users.txt", "utf-8");
    const parsData =JSON.parse(getData)
    // console.log(parsData);
    const indexNumber= parsData.findIndex((user)=>{
        if(user.id == request.params.userId){
            return user
        } 
    })

    // console.log( indexNumber, "index");
    parsData.splice(indexNumber, 1)
    // console.log(parsData);
    fs.writeFileSync("Users.txt", JSON.stringify(parsData))
    
    response.send("Deleted")
})



app.listen(port , ()=>{
    console.log(`server is running on http://localhost:${port}`);
    
})