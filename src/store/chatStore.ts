import { create } from "zustand";

import type { Message } from "@/types/chat";

type ChatStore = {

    messages: Message[];

    loading: boolean;

    addMessage: (
        message: Message
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

    clearMessages: () =>

        set({

            messages: []

        }),

    setLoading: (value) =>

        set({

            loading: value

        })

}));