import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-secondary text-white">
      <h1 className="text-lg font-semibold">FOCOS / DSI</h1>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage alt="@jaredpalmer" src="/placeholder-avatar.jpg" />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
