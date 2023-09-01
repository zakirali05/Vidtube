import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request){
    const user = await currentUser()
    try{
const {values,google} = await req.json()
if(google === false){
    const updatedUser = await db.profile.update({
        where : {
            userId : user?.id,
        },
        data :{
            name : values.firstName + values.lastName
        }
    })

    return NextResponse.json(updatedUser)
}
const updatedUser = await db.profile.update({
    where : {
        userId : user?.id,
    },
    data :{
        name : user?.firstName || user?.emailAddresses.toString().split("@")[0],
    }
})

    }catch(err){
        return NextResponse.json(err)
    }
}