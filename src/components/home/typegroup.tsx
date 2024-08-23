import { MapPinned, MessageCircle, Pin, PinIcon, PinOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";

function TypeGroup() {
  return (
    <Tabs defaultValue="All" className="w-full  ">
      <TabsList className="w-full bg-gray-100 rounded-full py-7 px-2">
        <TabsTrigger value="All" className="w-full rounded-full py-2">
          All
        </TabsTrigger>
        <TabsTrigger value="Personal" className="w-full rounded-full py-2">
          Personal
        </TabsTrigger>
        <TabsTrigger value="Groups" className="w-full rounded-full py-2">
          Groups
        </TabsTrigger>
      </TabsList>
      <TabsContent value="All">
        <ScrollArea
          className="w-full "
          style={{ height: "calc(100vh - 200px)" }}
        >
          <div className="w-full rounded space-y-4 bg-white px-4 py-3">
            <div className="w-full space-y-2">
              <p className="flex text-sm text-muted-foreground justify-between items-center">
                Pinned messages. <Pin size={15} />
              </p>
              <div className="space-y-2">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center gap-3"
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
              <p className="flex text-sm text-muted-foreground justify-between items-center">
                Messages. <MessageCircle size={15} />
              </p>
              <div className="space-y-2">
                {Array(20)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center gap-3"
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
    </Tabs>
  );
}

export default TypeGroup;
