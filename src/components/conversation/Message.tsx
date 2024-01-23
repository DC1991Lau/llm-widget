import { Message } from "@/types";

export default function MessageContainer({ message }: { message: Message }) {
  if (!message) return;

  return (
    <div className="flex items-end space-x-2">
      <div className="flex flex-col space-y-2">
        <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    </div>
  );
}
