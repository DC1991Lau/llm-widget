import * as z from "zod";
import { RemoteRunnable } from "langchain/runnables/remote";
import { useStore } from "@/store/app.store";

import { messageInputSchema } from "@/lib/validators/message";

import { v4 as uuid } from "uuid";
import axios from "axios";

export function useConversation() {
  const { addMessage } = useStore();

  async function sendMessage(values: z.infer<typeof messageInputSchema>) {


    addMessage({
      id: uuid(),
      sender: "user",
      text: values.text,
      time: new Date(),
    });

    try {
      const remoteChain = new RemoteRunnable({
        url: "https://langserve-launch-example-vz4y4ooboq-uc.a.run.app/",
      });

      const stream = await remoteChain.stream({
      }, {
        configurable: {
          llm: 'medium_temp',
          prompt: values.text
        },
      });

      let accumulatedChunks = "";

      for await (const chunk of stream) {
        console.log(chunk);

        accumulatedChunks += chunk;
        addMessage({
          id: uuid(),
          sender: "user",
          text: accumulatedChunks,
          time: new Date(),
        });
      }
    } catch (error: any) {
      console.error("Error fetching streaming data:", error);
      // Handle error, e.g., display an error message in the UI
    }
  }

  return {
    sendMessage,
  };
}
