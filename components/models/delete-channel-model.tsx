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
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteChannel = () => {
  const model = UseModel();
  const router = useRouter()
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const isVisible = model.isOpen && model.label === "deleteChannel";
  const handleClose = () => {
    model.onClose();
  };
  const getMyChannels = async () => {
    const response = await axios.get("/api/channel");
    setChannels(response.data);
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
            {channels.length === 0 ? (
              <p className="text-md font-semibold text-rose-500 capitalize">You have not yet created any channel</p>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                {channels.map((channel) => (
                  <div
                    key={channel["channelImg"]}
                    className="flex items-center w-full justify-between"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Image
                        alt="img"
                        src={channel["channelImg"]}
                        height={100}
                        width={100}
                        className="h-14  w-14 rounded-full object-cover"
                      />
                      <p className="text-sm font-medium">{channel["name"]}</p>
                    </div>
                    <Button
                      disabled={loading}
                      onClick={async () => {
                        try {
                          setLoading(true);
                          const response = await axios.delete(
                            `/api/channel/${channel['id']}`
                            
                          );

                          console.log(response);
                          router.refresh();
                          model.onClose()
                          window.location.reload()
                        } catch (err) {
                          console.log(err);
                        } finally {
                          setLoading(false);
                        }
                      }}
                      variant="destructive"
                      size="icon"
                      className="text-white mr-5 p-[2px]"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannel;
