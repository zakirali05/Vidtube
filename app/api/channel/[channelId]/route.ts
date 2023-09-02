import { db } from "@/lib/db";
import { initialUser } from "@/lib/initial-user";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req:Request , { params }: { params: { channelId: string } }){
    try{
 
  
  const user = await currentUser()
  if(!user){
    return new NextResponse("Unautherized");
  }
  const userInDb = await db.profile.findUnique({
    where:{userId:user.id}
  })
  
  if(!userInDb){
    return new NextResponse("User not in database");
  }
  
  if(!params.channelId){
    return new NextResponse("Channel id not provided");
  }
  
  const response = await db.channel.delete({
    where:{
      id : params.channelId
    }
  })
  
  
  return NextResponse.json({message:"Deleted succesfully"})
    }catch(err){
      return NextResponse.json(err)
    }
  }






  export async function GET(req:Request , { params }: { params: { channelId: string } }){
    try{
      if(!params.channelId){
        return new NextResponse("Channel id not provided");
      }
      const channel = await db.channel.findUnique({
        where:{
          id : params.channelId
        }
      })
     
      const videos = await db.video.findMany({
        where:{
          channelId:params.channelId
        }
      })


      const subscribers = await db.subscriber.findMany({
        where:{
          channelId:params.channelId
        }
      })

      const user = await initialUser()

      const isOwner = user?.id === channel?.ownerId
const owner = await db.profile.findUnique({
  where:{
    id:channel?.ownerId
  }
})

const ownerName =owner?.name

const response = {
  channel,
  videos,
  subscribers,
  isOwner,
  ownerName
}


return NextResponse.json(response)
    }catch(err){
      return NextResponse.json(err)
    }
  }