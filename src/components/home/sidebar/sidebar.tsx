import React from "react";
import { Bell, Search } from "lucide-react";
import TypeGroup from "./typegroup";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

function HomeSideBar() {
  return (
    <div className="h-full space-y-4 relative  max-w-xs rounded-lg   bg-white py-3 border-2 border-gray-200">
      <div className="flex justify-between items-center px-3 ">
        <div className="flex justify-center items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-red-800"></span>
          <div className="flex flex-col ">
            <p className=" font-semibold">username</p>
            <p className="text-sm font-light text-muted-foreground">
              user bio and loda
            </p>
          </div>
        </div>
        <Search />
      </div>
      <TypeGroup />
      <div className="absolute bottom-2 left-2 hidden">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Bell size={20} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}

export default HomeSideBar;
