import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function ChatbotAvatar({ className }: { className?: string }) {
  return (
    <Avatar className={cn("border-2", className, "border-green-400")}>
      <AvatarImage src="" alt="avatar" />
      <AvatarFallback>
        <div className="h-10 w-10 bg-[#FFEFB2] rounded-full flex items-center justify-center  font-bold">
          <p>AI</p>
        </div>
      </AvatarFallback>
    </Avatar>
  );
}
