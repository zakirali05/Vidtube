import Video from "./video"


interface videoProps {
    id :string,
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
    <div className="flex flex-row-reverse  items-center justify-end  gap-5 flex-wrap w-screen   ">
    {videos?.map((video : any)=>(
        <Video video={video}  key={video}  />
    ))}
    </div>
)
}

export default VideoGrid