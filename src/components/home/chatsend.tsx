import React from "react";
import { Plus , Send , SmilePlus } from 'lucide-react';

function ChatSend() {
  return (
        <div className="flex border-l-2 border-r-2 border-b-2 justify-between items-center p-4 rounded-b-2xl gap-4 bg-white">
            <form className="w-full flex items-center bg-[#f7f7f7] rounded-full py-2 px-4">
            <SmilePlus size="22" className="text-gray-500"/>
            <input type="text" className="w-full p-3 bg-[#f7f7f7] outline-none" placeholder="Write a message..."/>
            </form>
            <button className="border-2 w-16 h-14 rounded-full aspect-auto grid place-content-center">
            <Plus/>
            </button>
            <button className="border-2 w-16 h-14 rounded-full aspect-auto grid place-content-center hover:bg-[#3478fc] group">
            <Send className="group-hover:text-white"/>
            </button>
        </div>
  );
}

export default ChatSend;
