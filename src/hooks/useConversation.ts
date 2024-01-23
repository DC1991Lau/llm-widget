import * as z from "zod";

import { useStore } from "@/store/app.store";

import { messageInputSchema } from "@/lib/validators/message";

import { v4 as uuid } from "uuid";

export function useConversation() {
  const { addMessage } = useStore();

  async function sendMessage(values: z.infer<typeof messageInputSchema>) {
    const requestBody = {
      input: {
        topic: "string",
      },
      config: {
        configurable: {
          llm: "medium_temp",
          prompt: values.text,
        },
      },
      kwargs: {},
    };

    addMessage({
      id: uuid(),
      sender: "user",
      text: values.text,
      time: new Date(),
    });

    try {
      const response = await fetch("http://aniketos:8090/stream", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
        addMessage({
          id: uuid(),
          sender: "user",
          text: accumulatedChunks,
          time: new Date(),
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error fetching streaming data:", error);
      // Handle error, e.g., display an error message in the UI
    }
  }

  return {
    sendMessage,
  };
}
