import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function WidgetAvatar({ avatar }: { avatar?: string }) {
  return (
    <Avatar className="absolute">
      <AvatarImage src={avatar} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
