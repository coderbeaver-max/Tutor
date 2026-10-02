import { create } from "zustand";

import type { Message } from "@/types/chat";

type ChatStore = {
    messages: Message[];
    loading: boolean;

    addMessage: (
        message: Message
    ) => void;

    appendToLastMessage: (
        chunk: string
    ) => void;

    clearMessages: () => void;

    setLoading: (
        value: boolean
    ) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    loading: false,

    addMessage: (message) =>
        set((state) => ({
            messages: [
                ...state.messages,
                message
            ]
        })),

    appendToLastMessage: (chunk) =>
        set((state) => {
            if (state.messages.length === 0) {
                return state;
            }

            const messages = [...state.messages];

            const lastMessageIndex = messages.length - 1;

            const lastMessage = messages[lastMessageIndex];

            messages[lastMessageIndex] = {
                ...lastMessage,
                content: lastMessage.content + chunk
            };

            return {
                messages
            };
        }),

    clearMessages: () =>
        set({
            messages: []
        }),

    setLoading: (value) =>
        set({
            loading: value
        })
}));