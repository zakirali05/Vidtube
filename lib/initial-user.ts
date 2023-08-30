import {currentUser } from "@clerk/nextjs"
import { db } from "./db"

export const initialUser =async ()=>{
const user =  await  currentUser()

if(!user){
    return null
}

const userInDb = await db.profile.findUnique({where:{userId : user.id}})

if (userInDb){
    return userInDb
}
const Profile = await db.profile.create({data:{
    userId : user.id,
    name : user.firstName || user.emailAddresses.toString().split("@")[0],
    email : user.emailAddresses[0].emailAddress,
    profileImage : user.imageUrl || "https://o.remove.bg/downloads/a0e7d4b1-6533-4224-b06a-ec94f733b16a/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-removebg-preview.png"
}})

return Profile

}