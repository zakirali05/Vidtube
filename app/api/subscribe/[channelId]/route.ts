import { db } from "@/lib/db";
import { initialUser } from "@/lib/initial-user";
import { NextResponse } from "next/server";

export async function PATCH(req:Request , { params }: { params: { channelId: string } }){
    try{
const user = await initialUser()

const channel = await db.channel.findUnique({
    where:{
        id:params.channelId
    }
})

if(!channel){
    return NextResponse.json("channel not found")
}

const subscriptionModel = await db.subscriber.findFirst({
  where:{
    doerId:user?.id,
    channelId : params.channelId
  }
})

if (subscriptionModel){
const unsubscribe = await db.subscriber.delete({
      
   where:{
    id : subscriptionModel.id
   }
   
})

return NextResponse.json({message : "Unsubscribed" , bool : false})
}

const subscribe = await db.channel.update({
    where:{
        id:channel.id
    },
    data:{
        subscribers :
            {
                create:{
                  doerId : user?.id!,
                  
                }
            }
        
    }
})

return NextResponse.json({message : "Subscribed" , bool : true})

    }catch(err){
        return NextResponse.json(err)
    }
}


export async function GET(req:Request , { params }: { params: { channelId: string } }){
    try{
const user = await initialUser()

const  isSubscribed = await db.subscriber.findFirst({
    where:{
        doerId:user?.id,
        channelId : params.channelId
    }
})



if(isSubscribed){
    return NextResponse.json(true)
}

return NextResponse.json(false)
    }catch(err){
        return NextResponse.json(err)
    }
}