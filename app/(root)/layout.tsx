import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import React from "react";

 const RootLayout = ({children}:{children :React.ReactNode})=>{
return (
    <>
    <Header/>
    <SideBar/> 
    <div className='pt-[100px] pl-[70px]'>
   {children}
   </div>
   </>
)
}


export default RootLayout