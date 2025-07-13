import mongoose from "mongoose";

const authModel = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phNumber : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true,
        enum : ["admin" , "vendor" , "customer"]
    },   
    isVarified : {
        type : Boolean,
        required : true
    },
    createdAt:{
        type: Date,
        required : true,
        default : Date.now()
    },

})

const auths = mongoose.model("AuthUser" , authModel)
export default auths