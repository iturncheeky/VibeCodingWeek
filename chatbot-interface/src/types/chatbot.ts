export interface ChatbotResponse {
  id: string;
  name: string;
  response: string;
  timestamp: Date;
  status: 'pending' | 'success' | 'error';
  isCollapsed: boolean;
}

export interface Chatbot {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
  color: string;
}

export interface QueryRequest {
  query: string;
  selectedChatbots: string[];
}