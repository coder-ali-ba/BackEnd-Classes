import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String
    },
    gender : {
        type : String,
        required : true,
        enum : ["male" , "female"]
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required :true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
    
})

const userModel = mongoose.model("users", userSchema)

export default userModel