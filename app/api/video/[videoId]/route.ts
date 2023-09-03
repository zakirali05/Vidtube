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

const channel = await db.channel.findUnique({
    where:{
        id : video.channelId
    }
})

if(!channel){
    return NextResponse.json("channel not found")
}


const response = await axios.get(`/api/channel/${channel.id}`)


return NextResponse.json({response , video})

}catch(err){
    return NextResponse.json(err)
}
}