import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
try{
const {values,url} = await req.json()

const channel = await db.channel.findUnique({
    where:{
        id:url
    }
})


if(!channel){
    return NextResponse.json("Channel not found")
}


const videoCreate = await db.channel.update({
    where:{
        id:url
    },
    data:{
        videos:{
            create:{
                videoLink : values.videoLink,
                thumbnailLink:values.thumbnailLink,
                title :values.title,
                description:values.description,
                keywords : values.keywords,
                premiumVideo:values.premiumVideo
            }
        }
    }
})


return NextResponse.json(videoCreate)

}catch(err){
    return NextResponse.json(err)
}
}