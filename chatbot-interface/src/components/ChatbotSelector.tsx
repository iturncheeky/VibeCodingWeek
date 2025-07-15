import React from 'react';
import { Chatbot } from '../types/chatbot';
import { CheckIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface ChatbotSelectorProps {
  chatbots: Chatbot[];
  selectedChatbots: string[];
  onToggleChatbot: (chatbotId: string) => void;
}

const ChatbotSelector: React.FC<ChatbotSelectorProps> = ({
  chatbots,
  selectedChatbots,
  onToggleChatbot,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Select AI Chatbots
      </h3>
      <div className="space-y-3">
        {chatbots.map((chatbot) => {
          const isSelected = selectedChatbots.includes(chatbot.id);
          return (
            <div
              key={chatbot.id}
              className={clsx(
                'relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200',
                isSelected
                  ? `border-${chatbot.color}-500 bg-${chatbot.color}-50`
                  : 'border-gray-200 hover:border-gray-300 bg-gray-50'
              )}
              onClick={() => onToggleChatbot(chatbot.id)}
            >
              <div className="flex items-center">
                <div
                  className={clsx(
                    'flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors',
                    isSelected
                      ? `bg-${chatbot.color}-500 border-${chatbot.color}-500`
                      : 'border-gray-300 bg-white'
                  )}
                >
                  {isSelected && (
                    <CheckIcon className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="ml-4 flex items-center">
                  <span className="text-2xl mr-3">{chatbot.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {chatbot.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {chatbot.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatbotSelector;