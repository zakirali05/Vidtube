"use client"

import { Poppins } from "next/font/google"
const poppins = Poppins({subsets:["latin"] , weight:["400","500","600","700","800","900"]})
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

import {Menu, User, Home , Crown , Settings, Globe} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Separator } from "./ui/separator"
import { ScrollArea } from "./ui/scroll-area"
import UseModel, { ModelType } from "@/hooks/use-model-hook"
const links = [
  {
    label : "trending" as ModelType,
    icon : Globe,
    href: "/"
  },
  {
    label : "upgrade" as ModelType,
    icon : Crown,
  
  },
  {
    label : "settings" as ModelType,
    icon : Settings,
    
  },
]
const keywords = ["Video editing","web development"  , "Entertainment","Comedy","Movies","Coding","Vlogs","Tutorials","Graphic designing","Racing","Ipl","html"];

const SideBar = () => {
  const model = UseModel()
  return (
    <div className="h-screen w-[70px] hidden md:block  fixed left-0 py-2">
      <div className="h-full w-full flex flex-col items-center justify-start">
      <Sheet >
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="border-0"><Menu/></Button>
      </SheetTrigger>
      <SheetContent side="left" >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2"><Image src="/logo.png" alt="logo" height="100" width="100" className="w-5 h-5 rounded-full" />  <p>Videtube.</p></SheetTitle>
          <SheetDescription>Welcome to your favorite video streaming platform.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-center justify-start w-full">
          <div className="w-full py-5 flex flex-col  gap-2">
            {links.map((link)=>(
              <div  onClick={()=>(model.onOpen(link.label))}    key={link.label} className={cn("flex items-center justify-start cursor-pointer ")}>
                <div className={cn("w-[40%] flex items-center hover:text-white p-2 rounded-md transition justify-between text-sm font-medium",poppins.className , link.label==="trending"?"hover:bg-emerald-500" : "",link.label==="upgrade"?"hover:bg-indigo-500" : "" ,link.label==="settings"?"hover:bg-pink-500" : "")}>
                <link.icon className="font-medium w-5 h-5"/>
               <p > {link.label}</p>
              
                </div>
              
              </div>
            ))}
          </div>
        </div>
        <Separator/>
        <div className="py-2">
          <SheetTitle className="text-lg">Explore</SheetTitle>
          <ScrollArea  className="h-[250px]">
{keywords.map((keyword)=>(
<div key={keyword} className="p-2 bg-muted rounded-md text-sm font-medium w-[40%] my-4 cursor-pointer">{keyword}</div>
))}
          </ScrollArea>
        </div>
        <SheetFooter className={cn("text-xs text-muted-foreground",poppins.className)}>Made with love by<span className="cursor-pointer hover:underline pl-1">ZakirAli</span></SheetFooter>
      </SheetContent>
    </Sheet>
    <div className="flex flex-col items-center justify-between gap-5 pt-16">
<div className="flex flex-col items-center justify-center gap-2 text-sm hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition  "><Home className="w-5 h-5"/><p>Home</p></div>
<div className="flex flex-col items-center justify-center gap-2 text-sm hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition  "><User className="w-5 h-5"/><p>Profile</p></div>
<div onClick={()=>(model.onOpen("upgrade"))}    className="flex flex-col items-center justify-center gap-2 text-sm hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition  "><Crown className="w-5 h-5"/><p>Upgrade</p></div>
<div  onClick={()=>(model.onOpen("settings"))}   className="flex flex-col items-center justify-center gap-2 text-sm hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition  "><Settings className="w-5 h-5"/><p>Settings</p></div>
    </div>
      </div>
    </div>
  )
}

export default SideBar