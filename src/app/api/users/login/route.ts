import User from "@/models/userModel";
import bcrypt from "bcrypt";
import { NextResponse,NextRequest } from "next/server";
import { dbConnect } from "@/database/database";
import  Jwt  from "jsonwebtoken";

dbConnect();


export async function POST(request:NextRequest) {
  try {
    const reqBody = await request.json();
    const {email,password} = reqBody;
    const user = await User.findOne({email});
    if(!user){
        return NextResponse.json("User Not Found",{status:400})
    }
    // compare password with hashed password in database
    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword){
        return NextResponse.json("Incorrect Password",{status:400})
    }
    //Generate Token And Response
    const tokenData = {
        id : user._id ,
        email : user.email,
        name : user.name,
    };
    const token = await Jwt.sign(
        tokenData,
        process.env.TOKEN_SECRET!,
        {expiresIn:"1d"}
    );
   const response =  NextResponse.json({message:"Login Successfull",token})
   response.cookies.set(
    "token",
    token,
   {httpOnly:true
})
   return response;
    
  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
  }
}