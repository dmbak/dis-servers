"use client";
import React, { useState } from "react";
import ChatMessage from "../components/ChatMessage";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState([
    // Example messages
    {
      id: 1,
      sender: "User1",
      message: "Hello!",
      timestamp: "12:00 PM",
      isSentByCurrentUser: false,
    },
    {
      id: 2,
      sender: "User2",
      message: "Hi there!",
      timestamp: "12:05 PM",
      isSentByCurrentUser: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    // Add logic to send a new message (e.g., through WebSocket or API)
    // For now, let's just add the message to the state
    const timestamp = new Date().toLocaleTimeString();
    const newMessageObject = {
      id: messages.length + 1,
      sender: "CurrentUser", // You can replace this with the actual username
      message: newMessage,
      timestamp,
      isSentByCurrentUser: true,
    };

    setMessages([...messages, newMessageObject]);
    setNewMessage("");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center p-4">
        <div className="flex-1 overflow-y-auto w-full max-w-screen-md">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.message}
              sender={msg.sender}
              timestamp={msg.timestamp}
              isSentByCurrentUser={msg.isSentByCurrentUser}
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
    </>
  );
};

export default ChatPage;
