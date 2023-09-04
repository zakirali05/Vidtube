import { db } from "@/lib/db";
import { initialUser } from "@/lib/initial-user";
import { NextResponse } from "next/server";

export async function GET(req:Request , {params} : {params : {videoId:string}}){
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


const user = await initialUser()

const comments  = await db.comment.findMany({
where:{
    videoId : params.videoId
}
})

const likes = await db.like.findMany({
    where:{
        videoId : params.videoId
    }
})


const dislikes = await db.dislike.findMany({
    where:{
        videoId:params.videoId
    }
})


const owner =  channel?.ownerId === user?.id





return NextResponse.json({channel,user,comments,likes,dislikes,owner})

    }catch(err){
        return NextResponse.json(err)
    }
}