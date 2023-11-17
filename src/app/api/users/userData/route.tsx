
import { dbConnect } from "@/database/database";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import {NextRequest,NextResponse } from "next/server";

dbConnect();

export async function GET(request:NextRequest) {
    try {
        const id = getDataFromToken(request);
        const user = await User.findOne({_id:id}).select("-password");
        return NextResponse.json(user);
    } catch (error:any) {
        throw new Error(error.message)
    }
};
