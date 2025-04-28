import apiService from "@/api";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useWebSocket } from "./websocket.context";
import { v4 as uuidv4 } from "uuid";
import { uniqBy } from "lodash";

export const MessageStateValues = {
  Received: "received",
  Sending: "sending",
} as const;

type MessageState =
  (typeof MessageStateValues)[keyof typeof MessageStateValues];

type MessageResponse =
  | {
      status: "success";
      data: {
        id: string;
      };
    }
  | { status: "error" };

export type Message = {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  state: MessageState;
};

type MessagesContextType = {
  messages: Message[];
  send: (content: string) => void;
  loading: boolean;
  error: string | null;
};

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
);

export const MessagesProvider: React.FC<{
  children: React.ReactNode;
  username: string;
}> = ({ children, username }) => {
  const { send: sendWsMessage, subscribe, isConnected } = useWebSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected) {
      return;
    }
    const handleNewMessage = (newMessage: Message) => {
      setMessages((prev) => uniqBy([...prev, newMessage], "id"));
    };

    const unsubscribe = subscribe<Message>("newMessage", handleNewMessage);
    toast.success("Successfully connected to the server!");

    return () => {
      unsubscribe?.();
    };
  }, [subscribe, isConnected]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await apiService.get("/message");

        if (!response.ok) {
          throw new Error(`Failed to fetch messages: ${response.statusText}`);
        }

        const data = await response.json();
        setMessages(
          data.map((m: Message) => ({
            ...m,
            createdAt: new Date(m.createdAt),
            updatedAt: new Date(m.updatedAt),
            state: MessageStateValues.Received,
          })),
        );
      } catch (err: unknown) {
        setError((err as Error).message || "An unknown error occurred");
        toast.error("An error occured while loading the messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const send = useCallback(
    (content: string) => {
      const tmpId = uuidv4();
      const newMessage = {
        id: tmpId,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: username,
      };
      setMessages((prev) => [
        ...prev,
        { ...newMessage, state: MessageStateValues.Sending },
      ]);

      sendWsMessage<MessageResponse>("newMessage", newMessage, (response) => {
        if (response.status === "error") {
          setMessages((prev) => prev.filter((m) => m.id !== newMessage.id));
          toast.error("Something went wrong while sending a message");
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === newMessage.id && response.data.id !== undefined
                ? {
                    ...m,
                    id: response.data.id,
                    state: MessageStateValues.Received,
                  }
                : m,
            ),
          );
        }
      });
    },
    [sendWsMessage, username],
  );

  return (
    <MessagesContext.Provider
      value={{
        messages,
        loading,
        error,
        send,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
