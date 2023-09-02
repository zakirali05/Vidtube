import BottomBar from "@/components/bottom-bar"
import SideBar from "@/components/sidebar"

const ChannelLayout =async ({children}:{children :React.ReactNode})=>{
    
return (
    <>
    <SideBar/> 
    <BottomBar/>
    <div className='md:pl-[70px]'>
   {children}
   </div>
   </>
)
}


export default ChannelLayout