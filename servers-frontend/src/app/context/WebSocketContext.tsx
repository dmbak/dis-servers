import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type WebSocketContextProps = {
  children: React.ReactNode;
  url: string;
};

type WebSocketContextValue = {
  webSocket: WebSocket | null;
  error: string | null;
};

const WebSocketContext = createContext<WebSocketContextValue | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<WebSocketContextProps> = ({
  children,
  url,
}) => {
  const webSocketRef = useRef<WebSocket | null>(null);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Convert HTTP URL to WebSocket URL
    const wsUrl = url.replace(/^http/, "ws");

    const socket = new WebSocket(wsUrl);
    webSocketRef.current = socket;
    setWebSocket(socket);

    // Error handling
    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
      setError("WebSocket connection failed");
    });

    socket.addEventListener("close", (event) => {
      console.warn("WebSocket closed:", event);
      setError("WebSocket connection closed");
    });

    // return () => {
    //   socket.close();
    return () => {
      if (socket.readyState === 1) {
        socket.close();
      }
    };
  }, [url]);

  const contextValue: WebSocketContextValue = {
    webSocket,
    error,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextValue => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }

  return context;
};
