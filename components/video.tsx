"use client"
import axios from "axios"
import { Crown } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface videoProps {
    channelId : string,
    videoLink : string,
    thumbnailLink : string,
    title : string,
    description : string,
    keywords : string,
    views : number,
    premiumVideo :boolean
    }
    interface channelType {
        id : string,
        name : string,
        channelBanner:string,
        channelImg : string
    }
    
    
    
    interface responceProps {
        channel : channelType,
        videos: Array<any>,
        subscribers : Array<any>,
        isOwner : boolean
        ownerName : string
    
    }
const Video = ({video}:{video :videoProps })=>{

const [data,setData] = useState<responceProps>()
const getChannel = async(channelId : string)=>{
    try{
const data = await axios.get(`/api/channel/${channelId}`)
setData(data.data)
    }catch(err){
        console.log(err,"Video_Error")
    }
}
useEffect(()=>{
getChannel(video['channelId'])
},[])

return (
    <div className="   w-[100%] sm:w-[45%] md:w-[29%] lg:w-[30%]  h-[300px] cursor-pointer">
      <div className="w-full h-full px-4 py-2 flex flex-col items-start justify-start gap-4">
        <div className="w-full h-[70%]">
    <Image  alt="banner" height={100} width={100} src={video['thumbnailLink']} className="w-full h-full object-cover" />
    </div>
    <div className="flex items-start justify-start gap-4 ">
        <div><Image src={data?.channel['channelImg']!} alt="logo" height={100} width={100} className="h-8 w-8 rounded-full object-cover" /></div>
        <div className="flex flex-col  items-start justify-start ">
            <p className="text-lg font-semibold">{video['title'].slice(0,50)}...</p>
           <div className="flex items-center justify-between w-full">
            <div className="flex flex-col ">
            <p className="text-muted-foreground text-sm font-medium">{data?.channel['name']}</p>
            <p className="text-muted-foreground text-sm font-medium flex gap-2  item-center justify-center"> <p>{video['views']} Views</p> <p>1 year ago</p>      </p>
            </div>
           {video['premiumVideo']? <div className="bg-indigo-500 text-white rounded-full p-3 flex items-center justify-center   "><Crown className="h-4 w-4"/></div> : ""}
           </div>

        </div>
    </div>
      </div>
      <div className="absolute bottom-[10px] right-[10px]">

      </div>
    </div>
)
}

export default Video