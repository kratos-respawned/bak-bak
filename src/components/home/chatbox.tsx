"use client";
import React from "react";
import { Dot, CornerUpLeft, CornerUpRight, Copy, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
              <div className="flex items-center gap-3">
                <div
                  id="message"
                  className="bg-white p-3 border rounded-xl max-w-[30rem] ml-4 text-muted-foreground text-sm font-light "
                >
                  Bhula dena mujhe ae alvida tujhe tujhe jeena hai mere bina,
                  safar ye hai tera ye rasta tera tujhe jeena hai mere bina 💔
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="gap-2">
                      <CornerUpLeft size={14} />
                      Reply
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="gap-2"
                      onClick={() => {
                        const message =
                          document.getElementById("message")?.innerText;
                        if (message) {
                          navigator.clipboard.writeText(message);
                        }
                      }}
                    >
                      <Copy size={14} />
                      Copy
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2">
                      <CornerUpRight size={14} />
                      Forward
                    </DropdownMenuItem>
                    <DropdownMenuItem  className="gap-2 focus:bg-destructive/80 focus:text-white">
                      <Trash2 size={14} />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
    </ScrollArea>
  );
}

export default ChatBox;
