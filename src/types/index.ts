export interface Message {
  id: string;
  sender: "bot" | "user";
  text: string | undefined;
  time: Date;
}
