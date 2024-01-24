import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


export default function AIAvatar() {
  return (
    <Avatar className={cn("flex items-center justify-center")}>
      <AvatarImage src="" alt="avatar" />
      <AvatarFallback>
        <div className="h-10 w-10 bg-[#FFEFB2] rounded-full flex items-center justify-center">
          <UserIcon />
        </div>
      </AvatarFallback>
    </Avatar>
  )
}
