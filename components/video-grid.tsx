import Video from "./video"


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
  

const VideoGrid = ({videos}:{videos : Array<videoProps> | undefined})=>{
return (
    <div className="flex items-center justify-start  gap-5 flex-wrap w-screen   ">
    {videos?.map((video : any)=>(
        <Video video={video}   />
    ))}
    </div>
)
}

export default VideoGrid