import UseModel from "@/hooks/use-model-hook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRightSquare , ArrowRight } from "lucide-react";
import Link from "next/link";

const VisitChannel = () => {
  const model = UseModel();
  const [channels, setChannels] = useState([]);
  const isVisible = model.isOpen && model.label === "visitChannel";
  const handleClose = () => {
    model.onClose();
  };

  const getMyChannels = async () => {
    const response = await axios.get("/api/channel");
    setChannels(response.data);
    // window.location.reload()
    // console.log(channels)
  };

  useEffect(() => {
    getMyChannels();
  }, []);




  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Channels</DialogTitle>
          <DialogDescription>
            Visit all the channels created by you
          </DialogDescription>
          <ScrollArea className="h-[250px] pt-5">
            {
              channels.length === 0 ? <p className="text-md font-semibold text-rose-500 capitalize">You have not yet created any channel</p> :
               <div className="flex flex-col items-center justify-center gap-4 w-full">
             {channels.map((channel)=>(
              <div key={channel["channelImg"]} className="flex items-center w-full justify-between">
               <div className="flex items-center justify-center gap-3">
                <Image alt="img" src={channel["channelImg"]} height={100} width={100} className="h-14  w-14 rounded-full object-cover" />
                <p className="text-sm font-medium">{channel["name"]}</p>
               </div>
              <Link  href={`/channel/${channel['id']}`}> <Button onClick={model.onClose}   variant="ghost" className="text-indigo-500 underline hover:text-indigo-500 mr-5 flex items-center justify-center">Visit <ArrowRight className="ml-1 w-4 h-4"/></Button></Link>
              </div>
             ))}
               </div>
            }
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VisitChannel;
