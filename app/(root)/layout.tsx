
import BottomBar from "@/components/bottom-bar";
import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import UseModel from "@/hooks/use-model-hook";
import { currentUser } from "@clerk/nextjs";
import React from "react";

 const RootLayout =async ({children}:{children :React.ReactNode})=>{
    const user = await currentUser()
return (
    <>
    <Header firstName={user?.firstName} lastName = {user?.lastName} id={user?.id}/>
    <SideBar/> 
    <BottomBar/>
    <div className='pt-[110px] md:pl-[70px]'>
   {children}
   </div>
   </>
)
}


export default RootLayout