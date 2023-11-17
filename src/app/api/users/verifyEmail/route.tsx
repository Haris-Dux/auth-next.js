import { dbConnect } from "@/database/database";
import { NextResponse , NextRequest } from "next/server";
import User from "@/models/userModel";

dbConnect();

export async function POST(request:NextRequest) {

   try {
    const body = await request.json();
    const {token} = body;
    console.log(token);
    const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}});
    if(!user){
        return NextResponse.json({error:"Invalid Token"},{status:401});
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({message:'Verified Successfully'},{status:200})

   } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
   }

}