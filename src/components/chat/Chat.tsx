import EmptyState from "./EmptyState";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

import { useChatStore } from "@/store/chatStore";

function Chat() {

    const messages = useChatStore(

        state => state.messages

    );

    return (

        <div
            className="
                flex
                h-full
                flex-col
            "
        >

            <div
                className="
                    flex-1
                    overflow-y-auto
                "
            >

                {

                    messages.length === 0

                        ?

                        <EmptyState />

                        :

                        <ChatMessages />

                }

            </div>

            <ChatInput />

        </div>

    );

}

export default Chat;