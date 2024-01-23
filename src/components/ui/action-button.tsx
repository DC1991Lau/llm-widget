import { useAppStore } from "@/store/app.store";
import { MessageCircleIcon, XIcon } from "lucide-react";

export default function ActionButton() {
  const { widgetIsOpen } = useAppStore();
  return (
    <div className="w-12 h-12 rounded-full bg-secondary flex shadow-xl">
      <div className="flex items-center justify-center flex-1 text-white">
        {!widgetIsOpen ? <MessageCircleIcon /> : <XIcon />}
      </div>
    </div>
  );
}
