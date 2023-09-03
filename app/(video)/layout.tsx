import BottomBar from "@/components/bottom-bar"
import Header from "@/components/header"
import { currentUser } from "@clerk/nextjs"

const VideoLayout =async ({children}:{children :React.ReactNode})=>{
    const user = await currentUser()
return (
    <>
   <Header options={false}  firstName={user?.firstName} lastName = {user?.lastName} id={user?.id}/> 
    <BottomBar/>
    <div className='md:pl-[70px] pt-[60px]'>
   {children}
   </div>
   </>
)
}


export default VideoLayout