import { Bell, MessageCircle, Pin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { ScrollArea } from "../../ui/scroll-area";
import Group from "./group";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

function TypeGroup() {
  return (
    <div>
      <Tabs defaultValue="chats">
        <TabsList className="absolute bottom-2 left-2 ">
          <TabsTrigger
            value="chats"
            className="data-[state=active]:hidden"
            asChild
          >
            <button className="px-3 py-2   flex gap-2 items-center">
              <ChatBubbleIcon /> Chats
            </button>
          </TabsTrigger>
          <TabsTrigger
            value="notification"
            className="data-[state=active]:hidden"
            asChild
          >
            <button className="flex items-center  gap-2 px-3 py-2 ">
              <Bell size={16} /> Notification
            </button>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chats">
          <Tabs defaultValue="All" className="w-full  px-2">
            <TabsList className="w-full bg-gray-100 rounded-full py-7 px-2 gap-2">
              <TabsTrigger value="All" className="w-full rounded-full py-2">
                All
              </TabsTrigger>
              <TabsTrigger
                value="Personal"
                className="w-full rounded-full py-2"
              >
                Personal
              </TabsTrigger>
              <TabsTrigger value="Groups" className="w-full rounded-full py-2">
                Groups
              </TabsTrigger>
            </TabsList>
            <TabsContent value="All">
              <ScrollArea
                className="w-full border-b "
                style={{ height: "calc(100vh - 220px)" }}
              >
                <div className="w-full rounded space-y-4 bg-white  py-3">
                  <div className="w-full space-y-2">
                    <p className="flex text-sm text-muted-foreground justify-between items-center px-3">
                      Pinned messages. <Pin size={15} />
                    </p>
                    <div className="divide-y border-y">
                      {Array(4)
                        .fill(0)
                        .map((_, index) => (
                          <div
                            key={index}
                            className="flex justify-start items-center gap-3 hover:bg-gray-100 py-2 px-2 rounded"
                          >
                            <div className="w-8 h-8 rounded-full bg-red-700"></div>
                            <div className="">
                              <p className=" font-light">Harsh Babu</p>
                              <p className="text-sm font-extralight text-muted-foreground">
                                swag se karenge sab ka swagat
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="w-full space-y-2">
                    <p className="flex text-sm text-muted-foreground justify-between items-center px-3">
                      Messages. <MessageCircle size={15} />
                    </p>
                    <div className="w-full divide-y border-b">
                      {Array(20)
                        .fill(0)
                        .map((_, index) => (
                          <div
                            key={index}
                            className="flex  justify-start items-center gap-3 py-2 px-3 w-full  rounded hover:bg-gray-100"
                          >
                            <div className="w-8 h-8 rounded-full bg-red-700"></div>
                            <div className="">
                              <p className=" font-light">Harsh Babu</p>
                              <p className="text-sm font-extralight text-muted-foreground">
                                swag se karenge sab ka swagat
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="Groups">
              <ScrollArea
                className="w-full "
                style={{ height: "calc(100vh - 220px)" }}
              >
                <Group />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="Personal"></TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="notification">
          <ScrollArea
            className="w-full"
            style={{ height: "calc(100vh-220px)" }}
          >
            <div className="w-full rounded space-y-4 bg-white px-1 py-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className=" py-2 px-2 hover:bg-neutral-100 rounded "
                  >
                    <p className="flex items-center gap-2">
                      Notification from Javed
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Message is something
                    </p>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TypeGroup;
