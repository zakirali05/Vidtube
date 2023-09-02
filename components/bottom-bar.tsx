"use client";
import UseModel from "@/hooks/use-model-hook";
import { Crown, Home, Settings, User } from "lucide-react";
import Link from "next/link";

const BottomBar = () => {
  const model = UseModel();
  return (
    <div className="fixed bottom-0 w-full md:hidden px-6 custompadding  left-0 right-0 py-2 border-t">
      <div className="flex  items-center justify-between gap-3 ">
       <Link href="/"> <div className="flex flex-col items-center justify-center gap-2 text-sm hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition  ">
          <Home className="w-5 h-5" />
          <p>Home</p>
        </div>
        </Link>
        <div className="flex flex-col items-center justify-center gap-2 text-sm hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition  ">
          <User className="w-5 h-5" />
          <p>Profile</p>
        </div>
        <div
          onClick={() => model.onOpen("upgrade")}
          className="flex flex-col items-center justify-center gap-2 text-sm hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition  "
        >
          <Crown className="w-5 h-5" />
          <p>Upgrade</p>
        </div>
        <div
          onClick={() => model.onOpen("settings")}
          className="flex flex-col items-center justify-center gap-2 text-sm hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition  "
        >
          <Settings className="w-5 h-5" />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
