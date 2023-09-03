import { db } from "@/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req:Request , { params }: { params: { videoId: string } }){
try{
const video = await db.video.findUnique({
    where:{
        id:params.videoId
    }
})


if(!video){
    return NextResponse.json("video not found")
}





return NextResponse.json(video)

}catch(err){
    return NextResponse.json(err)
}
}