import { createContext, useContext, FC, ReactNode } from "react";

export const WebSocketProvider: FC<{ children?: ReactNode; url: string }> = ({
  children,
  url,
}) => {
  // TODO: 1. Implement websocket connection
  console.debug(`Connecting to ${url}`);

  // TODO: 2. Implement websocket send message
  const send = <T extends object>(
    event: string,
    data: unknown,
    _callback?: (response: T) => void,
  ) => {
    console.debug(`Sending event: ${event} with data: ${data}`);
  };

  // TODO: 3. Implement websocket subscribe
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
