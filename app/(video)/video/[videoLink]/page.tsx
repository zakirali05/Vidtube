"use client";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Video from "@/components/video";
import VideoGrid from "@/components/video-grid";
import UseModel from "@/hooks/use-model-hook";
import axios from "axios";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
interface videoProps {
  id: string;
  channelId: string;
  videoLink: string;
  thumbnailLink: string;
  title: string;
  description: string;
  keywords: string;
  premiumVideo: boolean;
  views: number;
}
interface channelType {
    id : string,
    name : string,
    channelBanner:string,
    channelImg : string
}



interface responceProps {
    channel : channelType,
    videos: Array<videoProps>,
    subscribers : Array<any>,
    isOwner : boolean
    ownerName : string

}

interface resultProps {
    response : responceProps,
    video : videoProps
}

interface commentType{
  commenterId  :string,
  videoId : string,
message : string,
}

interface likeType{
doerId:string,
videoId: string
}

interface dislikeType{
  doerId:string,
  videoId: string
}

interface userType{
  userId : string,
  name : string,
  email : string,
  profileImg : string,
  premiumUser : boolean
}

interface videoPageProps {
channel : channelType,
user : userType,
owner : boolean,
comment :commentType[] ,
likes : likeType[],
dislikes : dislikeType[],
}


const VideoPage = ({ params }: { params: { videoLink: string } }) => {
  const [videos, setVideos] = useState<Array<videoProps>>(
    
  );

const [video,setVideo]  =  useState<videoProps>()
// const [videoPage , setVideoPage] = useState<videoPageProps | undefined>(undefined)
const [loading,setLoading] = useState<boolean>(false)
const [isSubscribed , setIsSubscribed] = useState<boolean>(false)
const model = UseModel()
  const getVideos = async () => {
    try {
      const videos = await axios.get("/api/video");
     const video = await axios.get(`/api/video/${params.videoLink}`)
    //  const details = await axios.get(`/api/videopage/${params.videoLink}`)
    //  setVideoPage(details.data)
    //  const sub = await axios.get(`/api/subscriber/${videoPage?.channel?.id}`)
     
    // setIsSubscribed(sub)
     setVideo(video.data)
      setVideos(videos.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVideos();
    console.log(video)
  }, []);

  return (
    <div className="p-5 flex flex-col md:flex-row gap-3">
      <div className="w-[100%] md:w-[60%]">
    <div className="w-full flex flex-col items-start justify-start">
        <video src={video?.videoLink} autoPlay   controls loop className="w-full md:h-[400px]  object-contain"></video>
        <p className="py-2 text-xl font-semibold">{video?.title}</p>
        <div className="flex items-center justify-between flex-row md:flex-col">
          <div></div>
          {/* {videoPage?.owner?<Button onClick={()=>model.onOpen("uploadVideo")}   className="w-[80%] sm:w-[7rem] bg-indigo-500  dark:text-white hover:bg-indigo-400">Upload <Upload className="pl-2 w-6 h-6 hover:bg-indigo-400"/></Button>  : <Button 
    variant={isSubscribed?"outline" :"default"}
    className="w-[80%] dark:text-white  sm:w-[9rem] bg-indigo-500  hover:bg-indigo-400" onClick={async()=>{
    try{
        setLoading(true)
        const message = await axios.patch(`/api/subscribe/${}`)
        console.log(message.data)
        window.location.reload()
       
    }catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
    }
      
        
    }     >{isSubscribed?"Unsubscribe" : "Subscribe"} {loading ? <Loader size={10} color="white"  />:<Bell className="pl-2 w-6 h-6 " />}</Button>} */}
        </div>
    </div>

      </div>
      <div className="w-[100%] md:w-[40%]  flex  flex-col-reverse items-center justify-center">
        <ScrollArea className="h-screen flex flex-col-reverse items-center justify-center gap-4 px-2">
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          {videos?.map((video) => (
            <Video  key={video.id}  video={video} />
          ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default VideoPage;
