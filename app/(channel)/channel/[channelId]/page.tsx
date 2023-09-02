"use client";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import VideoGrid from "@/components/video-grid";
import UseModel from "@/hooks/use-model-hook";

import axios from "axios";
import { Bell, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";


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






const ChannelPage = ({ params }: { params: { channelId: string } }) => {
  const [response, setResponse] =useState<responceProps>();
  const model = UseModel()
const [owner,setOwner] = useState<boolean>(false)
const [loading,setLoading] = useState<boolean>(false)
const [isSubscribed , setIsSubscribed] = useState<boolean>(false)
  const getChannel = async (channelId: string) => {
    try {
     const {data} = await axios.get(`/api/channel/${params.channelId}`)
    
    const bool = await await axios.get(`/api/subscribe/${params.channelId}`)
    setIsSubscribed(bool.data)
     setResponse(data)
     setOwner(data['isOwner'])
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChannel(params.channelId);
    
  }, []);
  return (
    <div>
      <div className="w-full h-[200px]">
        <Image
          alt="banner"
          src={response ?response['channel']['channelBanner'] : ""}
          height={100}
          width={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex items-center justify-between py-5 sm:px-12  gap-4 flex-col sm:flex-row md:gap-0">
        <div className="flex items-center justify-start gap-4">
          <Image
            alt="logo"
            src={response ?response['channel']['channelImg'] : ""}
            height={100}
            width={100}
            className="h-[6rem] w-[6rem] rounded-full object-cover"
          />
          <div className="flex flex-col items-start justify-between gap-2">
            <div className="flex flex-col items-start justify-center">
              <p className="text-xl font-semibold">
                {response ?response['channel']['name'] : ""}
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                @{response ?response['ownerName'] : ""}
              </p>
            </div>
            <div className="flex items-start justify-between gap-4">
              <p className="font-medium text-md ">{response?response['subscribers'].length : ""} Subscribers</p>
              <p className="font-medium text-md ">{response?response['videos'].length : ""} Videos</p>
            </div>
          </div>
        </div>
    {owner?<Button onClick={()=>model.onOpen("uploadVideo")}   className="w-[80%] sm:w-[7rem] bg-indigo-500  dark:text-white hover:bg-indigo-400">Upload <Upload className="pl-2 w-6 h-6 hover:bg-indigo-400"/></Button>  : <Button 
    variant={isSubscribed?"outline" :"default"}
    className="w-[80%] dark:text-white  sm:w-[9rem] bg-indigo-500  hover:bg-indigo-400" onClick={async()=>{
    try{
        setLoading(true)
        const message = await axios.patch(`/api/subscribe/${params.channelId}`)
        console.log(message.data)
        window.location.reload()
       
    }catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
    }
      
        
    }     >{isSubscribed?"Unsubscribe" : "Subscribe"} {loading ? <Loader size={10} color="white"  />:<Bell className="pl-2 w-6 h-6 " />}</Button>}
        
      </div>

      <div className="w-full p-8">
        <VideoGrid videos={response?response['videos'] : []}  />
      </div>
    </div>
  );
};

export default ChannelPage;
