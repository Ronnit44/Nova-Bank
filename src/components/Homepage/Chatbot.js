"use client";
import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

const CustomChatbot = ({ toggleChatbot }) => {
  return (
    <div className="fixed bottom-8 right-8 z-50 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-end p-2">
        <button onClick={toggleChatbot} className="text-gray-500 hover:text-gray-700">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
    </div>
  );
};

export default CustomChatbot;