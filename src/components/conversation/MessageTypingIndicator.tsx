import ChatbotAvatar from "../shared/ChatbotAvatar";

export default function MessageTypingIndicator() {
  return (
    <div className="w-full flex flex-col justify-end">
      <div className="flex gap-2 items-center">
        <ChatbotAvatar />

        <TypingIndicator />
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 text-gray-500">
      <div className="h-2 w-2 bg-slate-300 rounded-full animate-bounce"></div>
      <div className="h-2 w-2 bg-slate-300 rounded-full animate-bounce"></div>
      <div className="h-2 w-2 bg-slate-300 rounded-full animate-bounce"></div>
    </div>
  );
}
