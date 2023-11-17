
import mongoose from "mongoose";


const userScheme = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a username"]
    },
    email:{
        type:String,
        required:[true,"Please provide a  email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"user"
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
},
{timeStamp:true}
);


const User = mongoose.models.users || mongoose.model("users",userScheme);
export default User;