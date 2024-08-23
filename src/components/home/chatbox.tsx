import React from "react";
import { Dot } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

function ChatBox() {
  return (
    <ScrollArea className=" border-r-2 border-l-2 border-b-2 p-4  h-[calc(100vh-195px)]">
      <p className="text-center text-sm text-gray-500">Today</p>
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex mb-4">
            <div className="h-8 w-8 bg-pink-300 rounded-full"></div>
            <div>
              <div className="flex pl-4 items-center">
                <p className="">Harshu</p>
                <p>
                  <Dot />
                </p>
                <p className="font-light text-xs text-muted-foreground">
                  08:34
                </p>
              </div>
              <div className="bg-white p-3 border rounded-xl max-w-[30rem] ml-4 text-muted-foreground text-sm font-light ">
                Bhula dena mujhe ae alvida tujhe tujhe jeena hai mere bina,
                safar ye hai tera ye rasta tera tujhe jeena hai mere bina 💔
              </div>
            </div>
          </div>
        ))}
    </ScrollArea>
  );
}

export default ChatBox;
