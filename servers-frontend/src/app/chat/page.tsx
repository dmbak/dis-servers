import React, { useEffect, useState } from "react";
import ChatMessage from "../components/ChatMessage";
import { useWebSocket } from "../context/WebSocketContext";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<{ content: string; sender: string; timestamp: string }>
  >([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const { webSocket, error } = useWebSocket();

  useEffect(() => {
    if (webSocket) {
      console.log("WebSocket State:", webSocket.readyState);

      webSocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, message]);
        } catch (error) {
          console.error("Error parsing incoming message:", error);
        }
      };
    }

    return () => {
      // Cleanup function
      if (webSocket) {
        webSocket.onmessage = null;
      }
    };
  }, [webSocket]);

  const handleSendMessage = () => {
    if (webSocket?.readyState === WebSocket.OPEN) {
      const messageObject = {
        sender: "CurrentUser",
        content: newMessage,
      };

      webSocket.send(JSON.stringify({ message: messageObject }));
      setNewMessage("");
    } else {
      console.error("WebSocket is not open.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex-1 overflow-y-auto w-full max-w-screen-md">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.content}
            sender={msg.sender}
            timestamp={msg.timestamp}
            isSentByCurrentUser={msg.sender === "CurrentUser"}
          />
        ))}
      </div>
      <div className="flex items-center w-full max-w-screen-md">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg border border-gray-300 mr-2"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
