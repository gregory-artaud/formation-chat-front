import { FC, ReactNode } from "react";
import { MessagesProvider } from "./hooks/contexts/messages.context";
import { Toaster } from "./components/ui/sonner";
import { WebSocketProvider } from "./hooks/contexts/websocket.context";
import { UseLocalUsername } from "./hooks/use-local-username";
import { toast } from "sonner";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const { username, loading } = UseLocalUsername();

  if (loading) {
    return "loading...";
  }

  if (!username) {
    toast.error("An error occured while retrieving the username");
    return "No username provided";
  }

  return (
    <WebSocketProvider url={import.meta.env.VITE_API_BASE_URL ?? null}>
      <MessagesProvider username={username}>
        {children}
        <Toaster expand position="top-right" richColors />
      </MessagesProvider>
    </WebSocketProvider>
  );
};
