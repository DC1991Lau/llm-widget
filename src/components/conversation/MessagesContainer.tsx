import MessageBubble from "./Message";
import { useStore } from "@/store/app.store";
import { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";

export default function MessageContainer() {
  const { messages } = useStore();
  const ref = useRef<HTMLDivElement>(null);

  const scrollToLastMessage = () => {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [messages]);

  return (
    <ScrollArea className="flex flex-col px-6 pt-[21px] h-full max-w-full flex-grow-0 bg-white">
      <div className="flex flex-col gap-[24px]" ref={ref}>
        {
          messages.map(message => (
            <MessageBubble message={message} key={message.id} />
          ))
        }
      </div>

    </ScrollArea>
  );
}
