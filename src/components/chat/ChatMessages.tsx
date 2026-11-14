import { useChatStore } from "@/store/chatStore";

import ChatMessage from "./ChatMessage";

function ChatMessages() {

    const messages = useChatStore(
        state => state.messages
    );

    return (

        <div
            className="
                mx-auto
                flex
                max-w-5xl
                flex-col
                gap-6
                px-8
                py-8
            "
        >

            {

                messages.map(

                    (message, index) => (

                        <ChatMessage

                            key={index}

                            message={message}

                        />

                    )

                )

            }

        </div>

    );

}

export default ChatMessages;