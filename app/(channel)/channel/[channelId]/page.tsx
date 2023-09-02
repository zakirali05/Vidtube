"use client";
import { Button } from "@/components/ui/button";

import axios, { AxiosResponse } from "axios";
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
const [owner,setOwner] = useState<boolean>(false)
  const getChannel = async (channelId: string) => {
    try {
     const {data} = await axios.get(`/api/channel/${params.channelId}`)
     setResponse(data)
     setOwner(data['isOwner'])
     console.log(data)
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
              <p className="font-medium text-md ">{response?response['videos'].length : ""} Subscribers</p>
              <p className="font-medium text-md ">{response?response['subscribers'].length : ""} Videos</p>
            </div>
          </div>
        </div>
    {owner?<Button className="w-[80%] sm:w-[7rem] bg-indigo-500  dark:text-white">Upload <Upload className="pl-2 w-6 h-6 hover:bg-indigo-400"/></Button>  : <Button className="w-[80%] dark:text-white  sm:w-[8rem] bg-indigo-500  hover:bg-indigo-400">Subscribe <Bell className="pl-2 w-6 h-6 hover:bg-indigo-400" /></Button>}
        
      </div>
    </div>
  );
};

export default ChannelPage;
