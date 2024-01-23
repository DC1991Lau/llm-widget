import Header from "./Header";
import MessageContainer from "./MessagesContainer";
import MessageInputForm from "../forms/MessageInputForm";

export default function Chat() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <MessageContainer />
      <footer className="border-t p-6">
        <MessageInputForm />
      </footer>
    </div>
  );
}
