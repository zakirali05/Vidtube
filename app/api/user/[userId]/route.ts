import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request , { params }: { params: { userId: string } }){
    try{
const user = await db.profile.findUnique({
    where:{
        id : params.userId
    }
})

if(!user){
    return NextResponse.json("User not found")
}
return NextResponse.json(user)
    }catch(err){
        return NextResponse.json(err)
    }
}