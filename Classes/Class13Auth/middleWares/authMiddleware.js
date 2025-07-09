import  jwt  from "jsonwebtoken";

export const checkAuth = (req , res , next) => {
    const token = req.headers.authorization.split(" ")[1]
    const isVarified = jwt.verify(token , process.env.PRIVATEKEY) 
    if(isVarified){
        next()
    }else{
        res.json({
            status : false,
            message : "cross the PA"
        })
    }

}