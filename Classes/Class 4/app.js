import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.post("/main", (request, response)=>{
response.send(request.body)
})

app.get("/body", (req, res)=>{
    console.log(req.body);
    
    res.send(req.body)
})


const port = 8080
app.listen(port, ()=>{
    console.log(`server is running on http://localhost:8080`);
    
})
