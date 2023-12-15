"use client";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import ChatPage from "./chat/page";
import { WebSocketProvider, useWebSocket } from "./context/WebSocketContext";

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to set authentication status
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Function to set logout status
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Set up WebSocket connection
  const url = "ws://localhost:8000/ws/chat/lobby/";

  return (
    <WebSocketProvider url={url}>
      {/* Render different components based on authentication status */}
      {isLoggedIn ? (
        <div>
          <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <ChatPage onLogout={handleLogout} />
        </div>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </WebSocketProvider>
  );
};

export default Home;
