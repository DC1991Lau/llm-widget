/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { create } from "zustand";

interface FormData {
  userPrompt: string;
}

interface Message {
  type: "user" | "answer" | "error";
  content: string;
}

interface StreamStore {
  conversation: Message[];
  addToConversation: (message: Message) => void;
}

const useStreamStore = create<StreamStore>((set) => ({
  conversation: [],
  addToConversation: (message) =>
    set((state) => ({ conversation: [...state.conversation, message] })),
}));

const StreamingComponent: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const { conversation, addToConversation } = useStreamStore();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setValue("userPrompt", ""); // Clear the input after submission
    addToConversation({ type: "user", content: formData.userPrompt });

    try {
      const response = await fetch("http://localhost:2000/aiCompletion", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt: formData.userPrompt }),
      });

      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedChunks = "";

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        const decodedChunk = decoder.decode(value, { stream: true });
        accumulatedChunks += decodedChunk;
        addToConversation({ type: "answer", content: accumulatedChunks });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error fetching streaming data:", error);
      addToConversation({ type: "error", content: `Error: ${error.message}` });
      // Handle error, e.g., display an error message in the UI
    }
  };

  useEffect(() => {
    handleSubmit(onSubmit)(); // Immediately invoke the submit function to start fetching data

    // Cleanup function if needed (e.g., if the component unmounts)
    return () => {
      // Additional cleanup (if necessary)
    };
  }, [handleSubmit, onSubmit]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>User Prompt: </label>
        <input {...register("userPrompt")} />
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>Conversation:</p>
        {conversation.map((message, index) => (
          <div key={index} className={message.type}>
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamingComponent;
