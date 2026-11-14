import { Copy, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { Message } from "@/types/chat";

type Props = {
    message: Message;
};

function ChatMessage({ message }: Props) {

    const isUser = message.role === "user";

    async function copyMessage() {

        await navigator.clipboard.writeText(
            message.content
        );

    }

    return (

        <div
            className={`flex gap-4 ${isUser
                ? "justify-end"
                : "justify-start"
                }`}
        >

            {

                !isUser && (

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-cyan-500
                            text-slate-950
                            shadow-lg
                        "
                    >

                        <Bot size={20} />

                    </div>

                )

            }

            <div
                className={`
                    group
                    relative
                    max-w-4xl
                    rounded-3xl
                    border
                    p-6
                    shadow-xl

                    ${isUser
                        ? "border-cyan-500/40 bg-cyan-500 text-slate-950"
                        : "border-slate-800 bg-slate-900 text-white"
                    }
                `}
            >

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                >

                    {message.content}

                </ReactMarkdown>

                <button

                    onClick={copyMessage}

                    className="
                        absolute
                        right-4
                        top-4
                        opacity-0
                        transition
                        group-hover:opacity-100
                    "

                >

                    <Copy
                        size={16}
                        className="
                            text-slate-400
                            hover:text-cyan-400
                        "
                    />

                </button>

            </div>

            {

                isUser && (

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-800
                            text-white
                        "
                    >

                        <User size={20} />

                    </div>

                )

            }

        </div>

    );

}

export default ChatMessage;