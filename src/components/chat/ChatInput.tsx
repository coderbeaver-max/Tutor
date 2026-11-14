import { useState } from "react";

import {
    Mic,
    Paperclip,
    SendHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { askQuestion } from "@/services/api";
import { getUserId } from "@/services/userIdentity";
import { useChatStore } from "@/store/chatStore";

function ChatInput() {
    const [question, setQuestion] = useState("");

    const addMessage = useChatStore((state) => state.addMessage);
    const loading = useChatStore((state) => state.loading);
    const setLoading = useChatStore((state) => state.setLoading);

    async function handleSend() {
        const text = question.trim();

        if (!text || loading) return;

        addMessage({
            role: "user",
            content: text,
        });

        setQuestion("");

        try {
            setLoading(true);

            const userId = getUserId();

            const response = await askQuestion(
                userId,
                text
            );

            addMessage({
                role: "assistant",
                content: response.response,
            });
        } catch {
            addMessage({
                role: "assistant",
                content: "Something went wrong.",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-4">
            <div
                className="
                    mx-auto
                    flex
                    max-w-6xl
                    items-end
                    gap-3
                    rounded-xl
                    border
                    border-slate-800
                    bg-slate-900
                    px-3
                    py-2
                "
            >
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                >
                    <Paperclip size={18} />
                </Button>

                <Textarea
                    value={question}
                    disabled={loading}
                    placeholder="Ask JARVIS anything..."
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    className="
                        min-h-[44px]
                        max-h-40
                        resize-none
                        border-0
                        bg-transparent
                        px-0
                        py-2
                        text-white
                        shadow-none
                        focus-visible:ring-0
                    "
                />

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                >
                    <Mic size={18} />
                </Button>

                <Button
                    type="button"
                    size="icon"
                    disabled={loading}
                    onClick={handleSend}
                    className="h-10 w-10 rounded-lg"
                >
                    <SendHorizontal size={18} />
                </Button>
            </div>
        </div>
    );
}

export default ChatInput;