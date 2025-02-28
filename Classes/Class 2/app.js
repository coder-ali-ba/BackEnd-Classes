import { log } from "console";
import http from "http";


const server = http.createServer((request, response)=>{
    if (request.url=="/"){  
        response.end("Hello")
    }else if (request.url=="/main"){
        response.end("main")
    }else if (request.url=="/main/one"){
        response.end("one")
    }
   
    
 
  
})


const port = 8080;
server.listen(port,()=>{
    console.log(`server is running on http://192.168.2.108:${port}`);
    
})

