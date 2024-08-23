import React from "react";
import { Video, Phone, EllipsisVertical } from 'lucide-react';

function ChatNav() {
  return (
      <nav className="bg-white rounded-t-2xl">
        <div className="flex gap-5 border-2  justify-between items-center p-4 rounded-t-2xl">
            <div className="flex gap-4 items-center">
            <div className="bg-red-500 w-10 h-10 rounded-full"></div>
            <div>
                <p className="font-semibold">Homiesexual</p>
                <p className="text-sm text-green-500">Bihari Batla is typing...</p>
            </div>
            </div>
            <div className="flex gap-4">
                <Video size="22" />
                <Phone size="22" />
                <EllipsisVertical size="22" />
            </div>
        </div>
      </nav>
  );
}

export default ChatNav;
