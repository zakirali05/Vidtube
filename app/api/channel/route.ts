

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { channelImg, name } = await req.json();
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unautherized");
    }
    const userInDb = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!userInDb) {
      return new NextResponse("User is not in DB");
    }

const updatedUser = await db.profile.update({
  where:{
    userId :userInDb.userId
  },
  data:{
    channels : {
      create :{
        channelImg : channelImg,
        name : name,
        channelBanner : "https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
        subscriberId: userInDb.id,
      }
    }
  }
})

    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json(err);
  }
}



export async function GET (req:Request){
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


    const channels = await db.channel.findMany({
      where:{ownerId : userInDb.id}
    })


    return NextResponse.json(channels)
  }catch(err){
    return NextResponse.json(err);
  }
}



