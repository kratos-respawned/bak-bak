"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, UserRoundPlus } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

function Group() {
  const [group, setGroup] = useState([
    {
      name: "HomiesSexual",
      message: "latest message",
    },
  ]);

  const handleCreateGroup = () => {
    setCreateGroup(true);
  };
  const [createGroup, setCreateGroup] = useState(false);
  return (
    <div className="w-full px-1 space-y-2">
      <Sheet>
        <SheetTrigger className="w-full">
          <button className="flex w-full gap-4 items-center px-3 text-muted-foreground  rounded-lg py-2">
            <UserRoundPlus size={20} className="text-muted-foreground" />
            Create a Group
          </button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>Create a Group</SheetHeader>
          <SheetDescription>Add your friends and have fun</SheetDescription>
          <div className="space-y-3 py-10">
            <Input
              placeholder="Name"
              className="outline-none  focus-visible:ring-0 py-1"
            />
            <div className="flex items-center w-full gap-2 ">
              <Button
                type="button"
                className="w-full text-destructive"
                variant={"outline"}
                onClick={() => setCreateGroup(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-full "
                variant={"outline"}
                onClick={handleCreateGroup}
              >
                Create
              </Button>
            </div>
          </div>
          <div className={`w-full h-full ${createGroup ? "block" : "hidden"}`}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex  items-center gap-3 px-2 hover:bg-gray-100 py-2 rounded"
                >
                  <div className="">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 "></div>
                  </div>
                  <div className="w-full">
                    <p className=" font-light">Harsh</p>
                  </div>
                  <Button className="" variant={"outline"}>
                    Add
                  </Button>
                </div>
              ))}
          </div>
        </SheetContent>
      </Sheet>
      {group.map((g, index) => (
        <div
          key={index}
          className="flex  items-center gap-3 px-2 hover:bg-gray-100 py-2 rounded"
        >
          <div className="">
            <div className="w-8 h-8 rounded-full bg-yellow-400 "></div>
          </div>
          <div className="w-full">
            <p className=" font-light">{g.name}</p>
            <p className="text-sm font-extralight text-muted-foreground">
              {g.message}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Mute</DropdownMenuItem>
              <DropdownMenuItem>Leave</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive bg-destructive/20">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}

export default Group;
