"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Video from "@/components/video";
import VideoGrid from "@/components/video-grid";
import axios from "axios";
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


const VideoPage = ({ params }: { params: { videoLink: string } }) => {
  const [videos, setVideos] = useState<Array<videoProps>>(
    
  );

const [video,setVideo]  =  useState<videoProps>()

  const getVideos = async () => {
    try {
      const videos = await axios.get("/api/video");
     const video = await axios.get(`/api/video/${params.videoLink}`)
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
    </div>

      </div>
      <div className="w-[100%] md:w-[40%]  flex  flex-col-reverse items-center justify-center">
        <ScrollArea className="h-screen flex flex-col-reverse items-center justify-center gap-4 px-2">
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          {videos?.map((video) => (
            <Video video={video} />
          ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default VideoPage;
