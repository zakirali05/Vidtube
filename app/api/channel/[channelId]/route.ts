import { db } from "@/lib/db";
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