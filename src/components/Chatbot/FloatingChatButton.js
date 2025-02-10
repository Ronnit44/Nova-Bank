"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes } from '@fortawesome/free-solid-svg-icons';
import CustomChatbot from '../Homepage/Chatbot';

const FloatingChatButton = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  return (
    <div>
      <button
        className="fixed bottom-8 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg z-50"
        onClick={toggleChatbot}
      >
        <FontAwesomeIcon icon={isChatbotVisible ? faTimes : faComments} />
      </button>
      {isChatbotVisible && <CustomChatbot toggleChatbot={toggleChatbot} />}
    </div>
  );
};

export default FloatingChatButton;
