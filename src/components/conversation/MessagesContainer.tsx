import Message from "./Message";
import { useStore } from "@/store/app.store";
import { useEffect, useRef } from "react";

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
    <main className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </main>
  );
}
