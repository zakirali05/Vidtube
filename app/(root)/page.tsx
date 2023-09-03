"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import VideoGrid from "@/components/video-grid"
import axios from "axios"
import { useEffect, useState } from "react"

interface videoProps {
  id : string,
  channelId : string,
  videoLink : string,
  thumbnailLink : string,
  title : string,
  description : string,
  keywords : string,
  premiumVideo :boolean,
  views: number,
  }


export default  function Home() {
 
    

const [videos , setVideos] = useState<Array<videoProps> | undefined>(undefined)

const getVideos = async()=>{
  try{
const videos = await axios.get("/api/video")
setVideos(videos.data)
  }catch(err){
    console.log(err)
  }
}
useEffect(()=>{
getVideos()
console.log(videos)
},[])
  return (
    <ScrollArea className='h-screen pt-7 flex'>
   <VideoGrid videos={videos}/>
    </ScrollArea>
  )
}
