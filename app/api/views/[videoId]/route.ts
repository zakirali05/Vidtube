import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req:Request , { params }: { params: { videoId: string } }){
    try{

const video = await db.video.findUnique({
    where:{
        id : params.videoId
    }
})


if(!video){
    return NextResponse.json("there is no such video")
}
const Increased = await db.video.update({
    where: { id: params.videoId},
    data:{
        views : video?.views! + 1
    }
})

return NextResponse.json("Increased views")



    }catch(err){
        return NextResponse.json(err)
    }
}