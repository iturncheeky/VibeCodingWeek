# AI Chatbot Interface

A modern React TypeScript application that allows users to query multiple AI chatbots simultaneously and compare their responses in a beautiful, collapsible interface.

## Features

🤖 **Multiple AI Chatbot Support**
- Query multiple AI chatbots at once
- Support for GPT-4, Claude, Gemini, and LLaMA
- Easy chatbot selection with visual indicators

💬 **Interactive Query Interface**
- Clean, modern textarea with character counter
- Keyboard shortcuts (Enter to submit, Shift+Enter for new line)
- Real-time validation and loading states

📱 **Responsive Design**
- Beautiful Tailwind CSS styling
- Mobile-friendly responsive layout
- Smooth animations and transitions

🎯 **Collapsible Responses**
- Expandable/collapsible response panels
- Status indicators (pending, success, error)
- Timestamps for each response
- Clear visual distinction between different chatbots

⚡ **Modern UX**
- Real-time status updates
- Loading animations
- Error handling
- Clean, intuitive interface

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Components**: Headless UI
- **Utilities**: clsx for conditional classes

## Getting Started

### Prerequisites

- Node.js 14 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd chatbot-interface
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Usage

1. **Select Chatbots**: Choose which AI chatbots you want to query from the left sidebar
2. **Enter Your Query**: Type your question or prompt in the text area
3. **Submit**: Click "Send Query" or press Enter to send your question to all selected chatbots
4. **View Responses**: Watch as responses come in and expand/collapse them to compare
5. **Clear Results**: Use the "Clear All" button to start fresh

## Project Structure

```
src/
├── components/
│   ├── ChatbotSelector.tsx    # Chatbot selection interface
│   ├── QueryInput.tsx         # Query input form
│   └── ResponsePanel.tsx      # Response display with collapsible panels
├── types/
│   └── chatbot.ts            # TypeScript interfaces
├── App.tsx                   # Main application component
├── index.tsx                 # Application entry point
└── index.css                 # Global styles with Tailwind
```

## Mock API

The current implementation uses mock API calls that simulate real chatbot responses with:
- Random delays (1-4 seconds)
- Varied response content
- Occasional error simulation (10% chance)
- Different response styles for each chatbot

## Customization

### Adding New Chatbots

To add a new chatbot, update the `MOCK_CHATBOTS` array in `App.tsx`:

```typescript
{
  id: 'new-bot',
  name: 'New Bot',
  description: 'Description of the new bot',
  enabled: true,
  icon: '🆕',
  color: 'indigo',
}
```

And add corresponding mock responses in `MOCK_RESPONSES`.

### Styling

The application uses Tailwind CSS for styling. You can customize:
- Colors by modifying the `color` property in chatbot definitions
- Animations in `tailwind.config.js`
- Component styles in individual component files

## Future Enhancements

- 🔌 Real API integration with actual AI chatbot services
- 💾 Response history and persistence
- 📊 Response comparison tools
- 🎨 Theme customization
- 📤 Export functionality for responses
- 🔄 Response regeneration
- ⚙️ Advanced settings and configurations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Heroicons](https://heroicons.com/)
- UI components inspired by [Headless UI](https://headlessui.dev/)
- Styling powered by [Tailwind CSS](https://tailwindcss.com/)
