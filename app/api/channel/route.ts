

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
        channelBanner : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcA0wMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAAAQIDBAcFBv/EACEQAQEBAQACAgMBAQEAAAAAAAABAhEDEhMxIUFRkYFC/8QAGwEAAgMBAQEAAAAAAAAAAAAAAQIAAwQFBwb/xAAfEQEBAQADAAMAAwAAAAAAAAAAAQIDERITIUEEFDH/2gAMAwEAAhEDEQA/APFwA7/SoAAekAATpCBkFiESgrsFJGFdiEVUSu5FIVwrCXKJBjiu5FIVwrCXAiHCAz6RQI1soGC6OrJoDBdMfcBoAG2dAYIH+gMEE+kMgAvSEDJXYISoK7BSFcHC3PadoPnVcVMp4n6P3UzEOYi5k5DdZhpio9Z/D9Jf1F8PiXo/hjrxS/X4Y6zc3ljt4y8uOzrNy4n+wbx/TmAs4TN6V9GOkC3adDoIE90enQAOux6VAAJ6qAAD2gANPQ9AGcierR8oDWYVPHD+bRmKxk7fxFzx2/d42mZJ+IchdZ1+Lc8U/Wfx8Hq19RYpvcXzjn4z4fF8LhfQ/Gnh8Vw5E9GmEcGs9nGkh8V7qycbh8nj5WVw7946w1hl1FG+Fy+p5x1v6Lz41VLnhYfGTr+MB0s+BzBPTdOac8wXT6smkHTLoTtDOJ6qcPnqjFRcTFRoz1DRUXExUP6W5ipFSFFQtq/MEg9VRUinXS/OWfqPVr6j0ZtRbMMuD1a+hzCqnnGzmVTDXOGmfH39Eq/HD25vj6i+Hr6E8GrPxm/4L4NT/wA3/CWLL/Ft/Hzp4P6fx8dl8ab4yXPRf6/Tl9A6PQw6D4nwZT6kl82+b6X0IM3yJ0rpdI092p0Zz8FDgwY0zWkZZa5aMclWSLiomKi32tzFyLkRFwLtoxlWYuQsxchLtpxk5Dk6ci5lVa1YwmZOYa5yuYV1ozxIx4+urxeOThePLfMK3cPFIrMM5AjbMst+PGvvP/XL5fB63+x3WM/JOwtink4s1wegdFwCdMnxPx4SZJp8SYIzzSGc+0nDSgtUZ9VNH7NGsXGedNc2UZWnElVFwTHfpUzZ+qsm10xTi4mStcY1f0l20YxTi8xWPFf22x45C3Tbx8NqcZrXOF5y0zkvbdjhRnDSYaZw0mEa8cSMZayLzhpPGjXjirLg43+P8D406XfFXPYi566r4y+MC3irk9A6fQw6J8LzsEGOV5sZkDSgoJNZNIZ9IG9IqVt4L3TCdrq8GfWfn7T0u4Zbp1eNvlhhtkZXY422WmYyzWuR7a8SNMxpmM8tcjGvEaZka5kZZaZM14a5ka5jLLWVGvHTXMbSMc1rmi28fS+QcHQK0uJqkUC0uQAIR5oAHPeUgwBQGQN2hqzn+mE9U2ZGuMyfTfIA9tnFOm2GuaYPG7ja5rTNAM2YaZrXNIGjVhrmtM0AWrDXFa5pAzXhtmtc0AzXhUo9gEXFam0whbS6AEK//9k=",
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



