import { json } from 'express';
import jwt from 'jsonwebtoken'

const AuthCheck = (req , res , next) =>{
  const token = req.headers.authorization.split(" ")[1]

  const isVarified = jwt.verify(token , process.env.PRIVATEKEY)
   
  if(isVarified){
        next()
  }else{
    res.json({
        status:false,
        message : "Authorization Error"
      })
  }

  
}

export default AuthCheck