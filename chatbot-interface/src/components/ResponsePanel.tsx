import React from 'react';
import { ChatbotResponse } from '../types/chatbot';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface ResponsePanelProps {
  responses: ChatbotResponse[];
  onToggleCollapse: (responseId: string) => void;
}

const ResponsePanel: React.FC<ResponsePanelProps> = ({ responses, onToggleCollapse }) => {
  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(timestamp);
  };

  const getStatusIcon = (status: ChatbotResponse['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <ExclamationCircleIcon className="w-5 h-5 text-red-500" />;
      case 'pending':
        return (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        );
    }
  };

  const getStatusColor = (status: ChatbotResponse['status']) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'pending':
        return 'border-blue-200 bg-blue-50';
    }
  };

  if (responses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center text-gray-500">
          <div className="text-lg mb-2">🤖</div>
          <p>No responses yet. Submit a query to see results from AI chatbots.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {responses.map((response) => (
        <div
          key={response.id}
          className={clsx(
            'bg-white rounded-lg shadow-sm border-2 transition-all duration-200',
            getStatusColor(response.status)
          )}
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => onToggleCollapse(response.id)}
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(response.status)}
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {response.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {formatTimestamp(response.timestamp)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {response.status === 'pending' && (
                <span className="text-sm text-blue-600 font-medium">
                  Generating...
                </span>
              )}
              {response.isCollapsed ? (
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
          
          {!response.isCollapsed && (
            <div className="border-t border-gray-200 p-4 animate-slide-up">
              {response.status === 'success' && (
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {response.response}
                  </div>
                </div>
              )}
              {response.status === 'error' && (
                <div className="text-red-600 bg-red-100 p-3 rounded-md">
                  <p className="font-medium">Error occurred while fetching response:</p>
                  <p className="text-sm mt-1">{response.response}</p>
                </div>
              )}
              {response.status === 'pending' && (
                <div className="text-blue-600 bg-blue-100 p-3 rounded-md">
                  <p className="font-medium">Waiting for response...</p>
                  <p className="text-sm mt-1">This may take a few moments.</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResponsePanel;