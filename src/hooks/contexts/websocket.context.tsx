import { createContext, useContext, FC, ReactNode } from "react";

type WebSocketContextType = {
  subscribe: <T extends object>(
    event: string,
    handler: (data: T) => void,
  ) => (() => void) | undefined;
  send: <T extends object>(
    event: string,
    data: unknown,
    callback?: (response: T) => void,
  ) => void;
  isConnected: boolean;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => {
  const ctx = useContext(WebSocketContext);
  if (ctx === null) {
    throw new Error("useWebSocket should be used within a WebSocketContext");
  }
  return ctx;
};

export const WebSocketProvider: FC<{ children?: ReactNode; url: string }> = ({
  children,
  url,
}) => {
  console.debug(`Connecting to ${url}`);

  const send = <T extends object>(
    event: string,
    data: unknown,
    _callback?: (response: T) => void,
  ) => {
    console.debug(`Sending event: ${event} with data: ${data}`);
  };

  const subscribe = <T extends object>(
    event: string,
    _handler: (data: T) => void,
  ) => {
    console.debug(`Subscribing to event: ${event}`);

    return () => {
      console.debug(`Unsubscribing from event: ${event}`);
    };
  };

  const value = {
    send,
    subscribe,
    isConnected: false,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
