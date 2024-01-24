import { cn } from "@/lib/utils";
import { Message } from "@/types";
import AIAvatar from "./Avatar";

export default function MessageBubble({ message }: { message: Message }) {
  if (!message) return;

  return (
    <div className={cn("flex w-full flex-col justify-end")}>
      <div className="flex gap-2 items-start">
        {
          message.sender === 'user' &&
          <AIAvatar />
        }
        <div className={cn("flex flex-col gap-[6px] w-full p-[10px] max-w-fit flex-wrap whitespace-normal break-words rounded-tl-[2px] rounded-bl-[8px] rounded-tr-[8px] rounded-br-[8px]",
          message.sender == 'bot' ? "bg-[#F5F5F5] " : "bg-primary"
        )}>
          <span className={cn(message.sender === 'user' && "hidden", "text-secondary")}>
            Cofibot
          </span>
          <div>
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
}
