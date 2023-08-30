"use client"

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

import {Menu, User, Home , Crown , Settings} from "lucide-react"
const SideBar = () => {
  return (
    <div className="h-screen w-[70px] hidden md:block  fixed left-0 py-2">
      <div className="h-full w-full flex flex-col items-center justify-start">
      <Sheet >
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="border-0"><Menu/></Button>
      </SheetTrigger>
      <SheetContent side="left" >
        
      </SheetContent>
    </Sheet>
    <div className="flex flex-col items-center justify-between gap-5 pt-16">
<div className="flex flex-col items-center justify-center gap-2 text-sm hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition  "><Home className="w-5 h-5"/><p>Home</p></div>
<div className="flex flex-col items-center justify-center gap-2 text-sm hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition  "><User className="w-5 h-5"/><p>Profile</p></div>
<div className="flex flex-col items-center justify-center gap-2 text-sm hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition  "><Crown className="w-5 h-5"/><p>Upgrade</p></div>
<div className="flex flex-col items-center justify-center gap-2 text-sm hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition  "><Settings className="w-5 h-5"/><p>Settings</p></div>
    </div>
      </div>
    </div>
  )
}

export default SideBar