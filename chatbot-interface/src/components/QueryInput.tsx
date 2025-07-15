import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface QueryInputProps {
  onSubmitQuery: (query: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

const QueryInput: React.FC<QueryInputProps> = ({ onSubmitQuery, isLoading, disabled }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !disabled) {
      onSubmitQuery(query.trim());
      setQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="query" className="block text-lg font-semibold text-gray-900 mb-3">
            Ask your question
          </label>
          <div className="relative">
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your question or prompt here..."
              className={clsx(
                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200',
                disabled && 'bg-gray-100 cursor-not-allowed',
                'min-h-[120px]'
              )}
              disabled={disabled}
              rows={4}
            />
            <div className="absolute bottom-3 right-3 text-sm text-gray-400">
              {query.length}/1000
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Press Shift+Enter for new line, Enter to submit
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {disabled && (
              <span className="text-orange-600 font-medium">
                Please select at least one chatbot
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={!query.trim() || disabled || isLoading}
            className={clsx(
              'inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm transition-all duration-200',
              !query.trim() || disabled || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105'
            )}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                Send Query
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QueryInput;