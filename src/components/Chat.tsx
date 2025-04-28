import { useMessages } from "@/hooks/contexts/messages.context";
import { Message, DetailedMessage } from "./Message";
import { Chatbox } from "./Chatbox";
import { useRef } from "react";

export const Chat = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const { messages, send } = useMessages();

  const onSendMessage = (content: string) => {
    send(content);
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  return (
    <div className="flex flex-col size-full">
      <div
        ref={chatRef}
        className="flex-grow flex flex-col justify-start items-start overflow-y-scroll pb-8"
      >
        {messages.map((m, index) => {
          if (index === 0 || messages[index - 1].author !== m.author) {
            return <DetailedMessage key={m.id} message={m} />;
          }
          return <Message key={m.id} message={m} />;
        })}
      </div>
      <div className="sticky bottom-0 px-5 py-4 bg-white w-full">
        <Chatbox sendMessage={onSendMessage} />
      </div>
    </div>
  );
};
