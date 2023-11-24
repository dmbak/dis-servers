"use client";
import React, { useState } from "react";
import Link from "next/link";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import SignUpForm from "./components/SignUpForm";
// import ChatMessage from "./components/ChatMessage";
import ChatPage from "./chat/page";

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

  return (
    <>
      {/* Render different components based on authentication status */}
      {isLoggedIn ? (
        <div>
          <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <ChatPage onLogout={handleLogout} />
        </div>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

export default Home;
