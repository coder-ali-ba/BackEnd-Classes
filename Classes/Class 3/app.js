
import express, { request, response } from 'express'
import { product } from './pro.js'
const app = express()

// app.get("/", (req, res)=>{
// res.send("main")
// })
// app.get("/about", (request, response)=>{
//     response.send("<h1>about dshik usahdiosjdio klhndijfoi </h1>")
// })


// app.get("/product" , (request, response)=>{
// response.send(product)
// })

///params
// app.get("/product/:Id", (req, res )=>{
//   const found =  product.find((item)=>{
//      return item.id == req.params.Id
//     })
//     res.send(found);
    
// })
// const port =8080;
// app.listen(port, ()=>{
//     console.log(`Server is running on http://localhost:${port}`);
    
// })


//QUery params

app.get("/search" , (request, response)=>{
    response.end("<h1>HAbibiAli</h1>")
})



const port = 8080;
app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
    console.log(request.param);
})
