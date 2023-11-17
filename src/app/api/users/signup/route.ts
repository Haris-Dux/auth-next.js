
import { dbConnect } from "@/database/database";
import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import { NextResponse,NextRequest } from "next/server";


dbConnect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {name,email,password} = reqBody;
        //CHECK IF USER EXISTS
        let user = await User.findOne({email});
        if(user){
            return NextResponse.json("User already exists",{status:409});
        };
        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const userData =  new User({
            name,
            email,
            password: hashedPassword
        });
        await userData.save();
        //SEND EMAIL
        await sendMail({email,emailType:'VERIFY',userId:userData._id})
        return NextResponse.json({msg:"User Created SuccessFully"},userData)
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
    

















