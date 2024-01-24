import { Message } from "@/types";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { RemoteRunnable } from "langchain/runnables/remote";

export async function postMessageToService({ message }: { message: Message }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await axios.post(
    `https://aniketos`,
    {
      sender: uuidv4(),
      message: message.text,
    },
    {
      timeout: 5000,
    }
  );

  if (!response.data || !Array.isArray(response.data)) {
    throw new Error("Invalid response from AI service");
  }

  const rasaResponse = response.data;

  const formattedMessage: Message[] = rasaResponse.map((rasaReply) => {
    const newMessage: Message = {
      id: uuidv4(),
      text: rasaReply.text,
      sender: "bot",
      time: new Date(),
    };

    return newMessage;
  });

  return formattedMessage;
}

export async function getMessageFromLLM() {
  const remoteChain = new RemoteRunnable({
    url: "https://langserve-launch-example-vz4y4ooboq-uc.a.run.app/",
  });

  const stream = await remoteChain.stream({
  }, {
    configurable: {
      llm: 'medium_temp',
      prompt: 'What is the days of the week?'
    }
  });

  for await (const chunk of stream) {
    console.log(chunk);
  }
}
