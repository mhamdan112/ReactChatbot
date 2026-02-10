# ChatBot - Full Stack Application

A complete chatbot solution with a LangGraph backend and React frontend. Chat with an AI powered by Groq's Llama model, manage multiple conversations, and upload PDFs for context.

## Project Structure

```
ReactUI/
├── Backend/
│   ├── main.py           - FastAPI server
│   ├── index.py          - LangGraph chatbot logic
│   ├── .env              - API keys and config
│   └── chatbot.db        - SQLite conversation storage
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md         - Frontend documentation
├── run-all.bat           - Start both servers
├── run-backend.bat       - Start only backend
├── run-frontend.bat      - Start only frontend
├── SETUP_GUIDE.md        - Detailed setup instructions
└── README.md             - This file
```

## Quick Start (Windows)

### Option 1: Start Everything at Once
Double-click `run-all.bat` in the ReactUI folder. This will:
- Start the backend server on http://localhost:8000
- Install frontend dependencies (first time only)
- Start the frontend on http://localhost:3000

### Option 2: Start Separately
1. Double-click `run-backend.bat` - starts the API server
2. Then double-click `run-frontend.bat` - starts the React app

### Option 3: Manual Startup

**Backend:**
```powershell
cd Backend
uvicorn main:app --reload
```

**Frontend:**
```powershell
cd Frontend
npm install  # First time only
npm start
```

## Features

### Backend (LangGraph + FastAPI)
- 🤖 AI-powered chatbot using Groq's Llama 3.1 model
- 🧵 Multi-threaded conversations with SQLite persistence
- 📄 PDF text extraction and processing
- 🔄 Streaming message responses
- ⚡ CORS-enabled for React frontend

### Frontend (React)
- 💬 Real-time chat interface
- 🧵 Conversation thread management
- 📄 PDF upload with drag-and-drop
- 📱 Fully responsive design
- ✨ Beautiful gradient UI with smooth animations
- ⌨️ Keyboard shortcuts (Shift+Enter for new line)

## Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **LangGraph** - Composable agent framework
- **Langchain** - LLM orchestration
- **Groq** - API for Llama 3.1 model
- **SQLite** - Persistent conversation storage
- **pypdf** - PDF text extraction

### Frontend
- **React 18** - UI framework
- **Axios** - HTTP client
- **CSS3** - Modern styling with gradients & animations

## System Requirements

- **Windows 10/11** (or WSL)
- **Node.js** 16+ (https://nodejs.org/)
- **Python** 3.8+ (https://www.python.org/)
- **Groq API Key** (free at https://console.groq.com/)

## Configuration

### Backend (.env file)
Create a `.env` file in the Backend folder with:
```
GROQ_API_KEY=your_api_key_here
```

Get your free API key from: https://console.groq.com/

### Frontend (API URL)
Edit `Frontend/src/App.js` if your API runs on a different URL:
```javascript
const API_BASE_URL = 'http://localhost:8000'; // Change if needed
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/threads` | Get all conversation threads |
| POST | `/chat` | Send a message (params: thread_id, message) |
| POST | `/upload-pdf` | Upload and extract PDF text |

## File Descriptions

### Backend Files
- **main.py** - FastAPI app with routes for chat, threads, and PDF upload
- **index.py** - LangGraph chat node setup and thread management
- **chatbot.db** - SQLite database storing conversation history

### Frontend Files
- **App.js** - Main component handling state and API calls
- **components/ChatWindow.js** - Chat message display and input
- **components/ThreadList.js** - Thread sidebar
- **components/PDFUpload.js** - PDF upload widget

## Usage

1. **Start the application** using one of the methods above
2. **Type a message** in the chat input box
3. **Press Enter** or click Send to get a response
4. **Create new chat** using the "+ New Chat" button
5. **Upload PDF** by clicking the PDF button or dragging a file
6. **Switch conversations** by clicking thread names in the sidebar

## Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line in message
- You can edit the code to add more shortcuts if needed

## Troubleshooting

### Backend won't start
- Check Python is installed: `python --version`
- Install dependencies: `pip install -r requirements.txt`
- Verify Groq API key is set in .env file
- Check port 8000 is not in use

### Frontend won't start
- Check Node.js is installed: `node --version`
- Delete node_modules: `rmdir /s Frontend\node_modules`
- Reinstall: `npm install` in Frontend folder
- Check port 3000 is not in use

### CORS errors in browser
- Ensure backend is running on http://localhost:8000
- Check CORS middleware is enabled in main.py (should be by default)

### No response from chatbot
- Verify internet connection (API calls go to Groq)
- Check Groq API key is valid
- Check backend logs for errors

## Database

Conversations are stored in `Backend/chatbot.db` (SQLite):
- Automatically created on first run
- Stores message history per thread_id
- Can be deleted to reset all conversations

## Development

### Making changes to Backend
1. Edit `Backend/index.py` or `Backend/main.py`
2. Server will auto-reload (uvicorn --reload)
3. Refresh frontend in browser

### Making changes to Frontend
1. Edit files in `Frontend/src/`
2. Dev server auto-reloads
3. Changes appear in browser immediately

## Deployment

### Deploy Backend (example: Render, Heroku, etc.)
- Set environment variable: `GROQ_API_KEY`
- Point to your API URL in frontend
- Update CORS allowed origins in main.py

### Deploy Frontend (example: Vercel, Netlify, etc.)
- Update `API_BASE_URL` in App.js to production URL
- Run: `npm run build`
- Deploy the `build/` folder

## Performance Tips

- **Caching**: Conversations are persisted in SQLite
- **Streaming**: Messages stream from Groq API for faster perceived response
- **Responsive**: React components re-render only when needed
- **Lazy Loading**: Import components as needed

## Security Notes

⚠️ **Important:**
- Never commit `.env` file with real API keys
- The current setup has `CORS allow_origins=["*"]` - restrict in production
- Store sensitive API keys in environment variables only
- Use HTTPS in production

## Future Enhancements

- [ ] User authentication
- [ ] Chat history export
- [ ] Dark mode toggle
- [ ] Message search
- [ ] Image upload support
- [ ] Text-to-speech
- [ ] Custom AI models selection
- [ ] Admin dashboard

## Support

- **LangGraph Docs**: https://langchain-ai.github.io/langgraph/
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Docs**: https://react.dev/
- **Groq API**: https://console.groq.com/

## License

This project is open source and available under the MIT License.

## Author

Created with ❤️ for seamless AI conversations

---

**Happy Chatting!** 🚀

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)
