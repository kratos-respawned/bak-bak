import React from "react";
import { Search } from "lucide-react";
import TypeGroup from "./typegroup";

function HomeSideBar() {
  return (
    <div className="h-full space-y-4  max-w-xs rounded-lg   bg-white p-3 border-2 border-gray-200">
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
    </div>
  );
}

export default HomeSideBar;
