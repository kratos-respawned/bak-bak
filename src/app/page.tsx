import ChatBox from "@/components/home/chatbox";
import HomeChat from "@/components/home/chathead";
import ChatSend from "@/components/home/chatsend";
import HomeSideBar from "@/components/home/sidebar";

export default function Home() {
  return (
    <main className="">
      <HomeChat />
      <ChatBox />
      <ChatSend />
    </main>
  );
}
