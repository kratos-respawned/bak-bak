import { MapPinned, MessageCircle, Pin, PinIcon, PinOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";

function TypeGroup() {
  const MockPinned = [
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },

    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
  ];
  const MockMessage = [
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
    {
      sender: "safasfd",
      message: "adsfasdfasfdasdf",
      image: <div className="w-8 h-8 rounded-full bg-green-500"></div>,
    },
  ];
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
        <ScrollArea className="w-full h-[840px]">
          <div className="w-full rounded space-y-4 bg-white px-4 py-3">
            <div className="w-full space-y-2">
              <p className="flex text-sm text-muted-foreground justify-between items-center">
                Pinned messages. <Pin size={15} />
              </p>
              <div className="space-y-2">
                {MockPinned.map((mock, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-3"
                  >
                    <div>{mock.image}</div>
                    <div className="">
                      <p className="text-sm font-light">{mock.sender}</p>
                      <p className="text-xs font-extralight text-muted-foreground">
                        {mock.message}
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
                {MockMessage.map((mock, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-3"
                  >
                    <div>{mock.image}</div>
                    <div className="">
                      <p className="text-sm font-light">{mock.sender}</p>
                      <p className="text-xs font-extralight text-muted-foreground">
                        {mock.message}
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
