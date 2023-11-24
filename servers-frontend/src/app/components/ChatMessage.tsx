import React from "react";

interface ChatMessageProps {
  message: string;
  sender: string;
  timestamp: string;
  isSentByCurrentUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  timestamp,
  isSentByCurrentUser,
}) => {
  const messageClass = isSentByCurrentUser
    ? "w-1/2 bg-green-500 text-white text-right"
    : "w-1/2 bg-gray-300 text-left";
  const messageContainerClass = `flex flex-col mb-2 ${
    isSentByCurrentUser ? "items-end" : "items-start"
  }`;

  return (
    <div className={messageContainerClass}>
      <div className={`message p-2 rounded-lg ${messageClass}`}>
        <span className="font-bold">{sender}</span>
        <p>{message}</p>
        <span className="text-xs">{timestamp}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
