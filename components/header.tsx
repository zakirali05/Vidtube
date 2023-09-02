"use client"
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { Button } from "./ui/button";

import {
  ChevronDownIcon,
  User,
  PlusCircle,
  Globe,
  CrownIcon,
  Trash,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./theme-switcher";
import Image from "next/image";
import Search from "./seach";
import UseModel from "@/hooks/use-model-hook";


interface UserInfo {
  firstName : string|null|undefined,
  lastName : string|null|undefined,
  id : string | undefined
}

const montserrat = Montserrat({ subsets: ["latin"] });

const Header =  ({firstName , lastName , id}:UserInfo) => {
  
  const model = UseModel()
  const keywords = ["Video editing","web development"  , "Entertainment","Comedy","Movies","Coding","Vlogs","Tutorials","Graphic designing","Racing","Ipl","html"];

  return (
    <nav className="top-0 fixed h-[350px] md:pl-[70px] px-4  w-full flex flex-col items-start  justify-start  gap-4 py-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-2">
          <Image
            alt="logo"
            src="/logo.png"
            height="100"
            width="100"
            className="rounded-full h-6 w-6"
          />
          <h1 className={cn("font-bold text-xl heading", montserrat.className)}>
            Vidtube.
          </h1>
        </div>
        <Search />
        <div className="flex items-center gap-2">
          <>
            <ModeToggle />
          </>
          {id ? (
            <div className="flex items-center gap-2">
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-between gap-2 bg-muted py-1 rounded-md px-3 ">
                    <h2 className="pr-4 font-semibold flex gap-2 items-center justify-center">
                      <User className="w-4 h-4 text-indigo-500" />
                      {firstName}
                      <span className="md:block hidden">{lastName}</span>
                    </h2>{" "}
                    <ChevronDownIcon className="w-4 h-4 " />{" "}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[12rem]">
                  
                    <DropdownMenuItem onClick={()=>(model.onOpen("createChannel"))}>
                      <div className="flex items-center justify-between w-full font-medium text-emerald-500">
                        <p>Create channel</p> <PlusCircle className="w-4 h-4" />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem  onClick={()=>(model.onOpen("visitChannel"))}>
                      <div className="flex items-center justify-between w-full font-medium text-slate-800 dark:text-muted-foreground">
                        <p>Visit channel</p> <Globe className="w-4 h-4" />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem  onClick={()=>(model.onOpen("upgrade"))}>
                      <div className="flex items-center justify-between w-full font-medium text-indigo-500">
                        <p>Upgrade</p> <CrownIcon className="w-4 h-4" />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem  onClick={()=>(model.onOpen("deleteChannel"))}>
                      <div className="flex items-center justify-between w-full font-medium text-rose-500">
                        <p>Delete Channel</p> <Trash className="w-4 h-4" />
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-indigo-500 dark:text-white hover:bg-indigo-400 " size="sm">
                Sign-in
              </Button>
            </Link>
          )}
        </div>
      </div>

      
        <div className="flex w-full  items-start justify-start gap-2 overflow-x-scroll ">
          {keywords.map((keyword) => (
            <div key={keyword} className="bg-muted cursor-pointer  py-2 px-3 rounded-md white-space-no-wrap">
              {keyword}
            </div>
          ))}
        </div>
    
    </nav>
  );
};

export default Header;
