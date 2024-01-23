import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";
import { Message } from "@/types";

export default function MessageText({ message }: { message: Message }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[6px] w-full p-[10px] max-w-fit flex-wrap  whitespace-normal break-words font-medium",
        message.sender == "bot"
          ? "bg-[#F5F5F5] rounded-tl-[2px] rounded-bl-[8px] rounded-tr-[8px] rounded-br-[8px]"
          : "bg-primary rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[2px] rounded-br-[8px]"
      )}
    >
      <span
        className={cn(message.sender === "user" && "hidden", "text-secondary")}
      >
        AI
      </span>
      <ReactMarkdown components={{ link: LinkRenderer }}>
        {message.text}
      </ReactMarkdown>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LinkRenderer(props: any) {
  return (
    <a
      href={props.href}
      target="_blank"
      className="hover:no-underline hover:text-inherit"
    >
      {props.children}
    </a>
  );
}
