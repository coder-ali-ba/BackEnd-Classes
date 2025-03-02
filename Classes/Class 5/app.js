

import express, { json } from 'express'
import fs from "fs"
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const port= 5000
app.get("/", (req, res)=>{
    res.send("Habib Ali")
})




app.post('/createuser', (req, res)=>{
    res.send("user Created")    
    const fileexist = fs.existsSync('Users.txt');
    if(fileexist){
        //Append User
        const getFile= fs.readFileSync("Users.txt", "utf-8");
        const parsData = JSON.parse(getFile)
        parsData.push(req.body)
        fs.writeFileSync("Users.txt", JSON.stringify(parsData))
    }else{
        //Create User
        var users =[]
        users.push(req.body)
        fs.writeFileSync("Users.txt", JSON.stringify(users))
    }
    

})
app.listen(port , ()=>{
    console.log(`server is running on http://localhost:${port}`);
    
})