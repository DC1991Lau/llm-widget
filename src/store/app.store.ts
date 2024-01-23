import { Message } from "@/types";
import { create } from "zustand";

type StoreType = {
  messages: Message[];
  messageIsLoading: boolean;
};

type ActionsType = {
  addMessage: (message: Message) => void;
  setMessageIsLoading: (isLoading: boolean) => void;
  clearMessages: () => void;
  clearStore: () => void;
};

export const useStore = create<StoreType & ActionsType>((set) => ({
  messages: [],
  messageIsLoading: false,

  addMessage: (message: Message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },
  clearMessages: () => {
    set(() => ({
      messages: [],
    }));
  },
  setMessageIsLoading: (isLoading: boolean) => {
    set(() => ({ messageIsLoading: isLoading }));
  },

  clearStore: () => {
    set({}, true);
  },
}));
