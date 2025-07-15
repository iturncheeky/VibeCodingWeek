import React, { useState, useCallback } from 'react';
import { Chatbot, ChatbotResponse } from './types/chatbot';
import ChatbotSelector from './components/ChatbotSelector';
import QueryInput from './components/QueryInput';
import ResponsePanel from './components/ResponsePanel';

// Mock chatbot data
const MOCK_CHATBOTS: Chatbot[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'OpenAI\'s most advanced language model',
    enabled: true,
    icon: '🤖',
    color: 'blue',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s helpful, harmless, and honest AI',
    enabled: true,
    icon: '🧠',
    color: 'purple',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google\'s multimodal AI model',
    enabled: true,
    icon: '✨',
    color: 'green',
  },
  {
    id: 'llama',
    name: 'LLaMA',
    description: 'Meta\'s open-source language model',
    enabled: true,
    icon: '🦙',
    color: 'orange',
  },
];

// Mock API responses
const MOCK_RESPONSES = {
  'gpt-4': [
    "I'd be happy to help you with that! Based on your question, here are some key points to consider:\n\n1. **Understanding the context** - It's important to first understand what you're trying to achieve.\n\n2. **Breaking down the problem** - Large problems are easier to solve when broken into smaller components.\n\n3. **Research and analysis** - Look for existing solutions and best practices.\n\n4. **Implementation strategy** - Plan your approach step by step.\n\nWould you like me to elaborate on any of these points or help you with a more specific aspect of your question?",
    "Great question! Let me provide you with a comprehensive analysis:\n\n**Primary considerations:**\n- Feasibility and resource requirements\n- Timeline and milestones\n- Risk assessment and mitigation\n- Success metrics and evaluation criteria\n\n**Next steps:**\n1. Define clear objectives\n2. Gather stakeholder input\n3. Create a detailed action plan\n4. Begin implementation with regular checkpoints\n\nI'm here to help you dive deeper into any of these areas!"
  ],
  'claude': [
    "Thank you for your question! I appreciate the opportunity to help. Let me break this down thoughtfully:\n\n**Key insights:**\n• This is a multifaceted topic that requires careful consideration\n• There are several approaches we could take, each with their own merits\n• The best solution will depend on your specific circumstances and goals\n\n**My recommendation:**\nStart with a clear definition of what success looks like for you, then work backwards to identify the most effective path forward. I'd be happy to explore any specific aspects in more detail.\n\nWhat particular area would you like to focus on first?",
    "I'm glad you asked about this! It's a topic I find quite interesting. Here's my perspective:\n\n**Understanding the fundamentals:**\n- Context is crucial for any meaningful analysis\n- Different stakeholders may have varying priorities\n- Balance is often key between competing considerations\n\n**Practical application:**\nConsider starting with small, manageable steps that allow you to test your approach and learn as you go. This iterative method often leads to better outcomes than trying to solve everything at once.\n\nHow does this align with what you had in mind?"
  ],
  'gemini': [
    "Excellent question! Let me provide you with a structured response that covers multiple dimensions:\n\n🔍 **Analysis Framework:**\n- Current state assessment\n- Desired future state\n- Gap identification\n- Solution mapping\n\n💡 **Creative approaches:**\n- Traditional methods vs. innovative solutions\n- Cross-industry best practices\n- Emerging trends and technologies\n\n📊 **Data-driven insights:**\nConsider gathering quantitative and qualitative data to inform your decision-making process. This will help ensure your approach is both effective and evidence-based.\n\nWould you like me to explore any of these areas in greater depth?",
    "Thank you for this interesting question! Here's a comprehensive perspective:\n\n**Multi-angle analysis:**\n1. **Technical considerations** - What are the capabilities and limitations?\n2. **Business impact** - How does this align with objectives?\n3. **User experience** - What's the human element?\n4. **Future scalability** - How will this evolve over time?\n\n**Actionable recommendations:**\n- Prioritize based on impact and effort\n- Build in flexibility for future changes\n- Establish clear metrics for success\n- Plan for regular review and optimization\n\nLet me know which aspect you'd like to explore further!"
  ],
  'llama': [
    "Thanks for your question! Here's my take on this:\n\n**Core principles to consider:**\n- Simplicity often leads to better outcomes\n- Understanding your constraints helps focus efforts\n- Collaboration and feedback improve results\n- Iteration and refinement are key to success\n\n**Practical approach:**\nI'd suggest starting with the fundamentals and building from there. Identify what's most important, focus on that first, and then expand your scope as you gain confidence and experience.\n\n**Key questions to ask:**\n- What are you trying to accomplish?\n- What resources do you have available?\n- What are the potential risks and how can you mitigate them?\n- How will you measure success?\n\nHappy to discuss any of these points in more detail!",
    "Great question! Let me share some thoughts on this:\n\n**Fundamental considerations:**\n• Clear problem definition is essential\n• Multiple solutions often exist - find the best fit\n• Implementation is as important as planning\n• Continuous learning and adaptation matter\n\n**Strategic approach:**\n1. Assess current situation thoroughly\n2. Define clear, measurable goals\n3. Identify available resources and constraints\n4. Develop a step-by-step action plan\n5. Execute with regular monitoring and adjustments\n\n**Remember:**\nThe best solution is often the one that's actually implemented well, rather than the theoretically perfect one that never gets executed.\n\nWhat specific aspect would you like to explore further?"
  ]
};

const App: React.FC = () => {
  const [selectedChatbots, setSelectedChatbots] = useState<string[]>(['gpt-4', 'claude']);
  const [responses, setResponses] = useState<ChatbotResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleChatbot = useCallback((chatbotId: string) => {
    setSelectedChatbots(prev => 
      prev.includes(chatbotId)
        ? prev.filter(id => id !== chatbotId)
        : [...prev, chatbotId]
    );
  }, []);

  const handleToggleCollapse = useCallback((responseId: string) => {
    setResponses(prev =>
      prev.map(response =>
        response.id === responseId
          ? { ...response, isCollapsed: !response.isCollapsed }
          : response
      )
    );
  }, []);

  const mockApiCall = async (chatbotId: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 3000 + 1000));
    
    const responses = MOCK_RESPONSES[chatbotId as keyof typeof MOCK_RESPONSES];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Simulate occasional errors
    if (Math.random() < 0.1) {
      throw new Error('Failed to get response from API');
    }
    
    return randomResponse;
  };

  const handleSubmitQuery = useCallback(async (query: string) => {
    if (selectedChatbots.length === 0) return;

    setIsLoading(true);

    // Create pending responses for all selected chatbots
    const newResponses: ChatbotResponse[] = selectedChatbots.map(chatbotId => {
      const chatbot = MOCK_CHATBOTS.find(c => c.id === chatbotId)!;
      return {
        id: `${chatbotId}-${Date.now()}`,
        name: chatbot.name,
        response: '',
        timestamp: new Date(),
        status: 'pending' as const,
        isCollapsed: false,
      };
    });

    setResponses(prev => [...newResponses, ...prev]);

    // Process each chatbot response
    const responsePromises = newResponses.map(async (response) => {
      const chatbotId = selectedChatbots.find(id => 
        MOCK_CHATBOTS.find(c => c.id === id)?.name === response.name
      )!;

      try {
        const apiResponse = await mockApiCall(chatbotId);
        
        setResponses(prev =>
          prev.map(r =>
            r.id === response.id
              ? { ...r, response: apiResponse, status: 'success' as const }
              : r
          )
        );
      } catch (error) {
        setResponses(prev =>
          prev.map(r =>
            r.id === response.id
              ? { 
                  ...r, 
                  response: error instanceof Error ? error.message : 'Unknown error occurred',
                  status: 'error' as const 
                }
              : r
          )
        );
      }
    });

    await Promise.all(responsePromises);
    setIsLoading(false);
  }, [selectedChatbots]);

  const clearAllResponses = () => {
    setResponses([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                AI Chatbot Interface
              </h1>
              <p className="mt-2 text-gray-600">
                Query multiple AI chatbots simultaneously and compare their responses
              </p>
            </div>
            {responses.length > 0 && (
              <button
                onClick={clearAllResponses}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Chatbot Selection */}
          <div className="lg:col-span-1">
            <ChatbotSelector
              chatbots={MOCK_CHATBOTS}
              selectedChatbots={selectedChatbots}
              onToggleChatbot={handleToggleChatbot}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Query Input */}
            <QueryInput
              onSubmitQuery={handleSubmitQuery}
              isLoading={isLoading}
              disabled={selectedChatbots.length === 0}
            />

            {/* Response Panel */}
            <ResponsePanel
              responses={responses}
              onToggleCollapse={handleToggleCollapse}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
