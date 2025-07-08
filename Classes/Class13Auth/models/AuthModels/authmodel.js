import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password : {
        type :String,
        required : true
    },
    phoneNumber : {
        type : String,
    },
    isAdmin :{
        type : String,
        required: true,
        enum : ["user" , "admin"]
    },
    createdAt:{ 
        type : Date,
        default :Date.now
    }

})

const userModel = mongoose.model("usermodel" , userSchema)

export default userModel