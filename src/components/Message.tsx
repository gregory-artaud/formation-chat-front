import {
  MessageStateValues,
  Message as MessageType,
} from "@/hooks/contexts/messages.context";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FC, ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

type MessageProps = {
  message: MessageType;
};
export const DetailedMessage: FC<MessageProps> = ({ message }) => {
  const { content, createdAt, author, state } = message;

  return (
    <MessageCard>
      <Avatar className="size-9">
        <AvatarImage className="rounded-md" src="/avatar.jpg" alt="avatar" />
        <AvatarFallback />
      </Avatar>
      <div className="flex flex-col justify-between h-full gap-1">
        <div className="flex gap-2">
          <p className="text-sm font-extrabold leading-none hover:underline hover:cursor-pointer">
            {author}
          </p>
          <p className="text-xs text-gray-600 hover:underline hover:cursor-pointer">
            {format(createdAt, "HH:mm", { locale: fr })}
          </p>
        </div>
        <MessageContent content={content} state={state} />
      </div>
    </MessageCard>
  );
};

export const Message: FC<MessageProps> = ({ message }) => {
  const { content, state } = message;

  return (
    <MessageCard>
      <div className="w-[36px]" />
      <MessageContent content={content} state={state} />
    </MessageCard>
  );
};

const MessageCard: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-start w-full justify-start gap-2 hover:bg-gray-50 px-5 py-2">
      {children}
    </div>
  );
};

const MessageContent: FC<{ content: string; state: MessageType["state"] }> = ({
  content,
  state,
}) => {
  const isSending = state === MessageStateValues.Sending;
  return (
    <>
      <p
        className={cn("text-sm leading-normal m-0", {
          "text-gray-400": isSending,
        })}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {isSending ? <p className="text-xs text-gray-500">(sending...)</p> : null}
    </>
  );
};
