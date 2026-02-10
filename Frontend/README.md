# Chatbot React UI

A modern React application for interacting with the LangGraph chatbot backend.

## Features

- 💬 **Real-time Chat**: Send and receive messages from the chatbot
- 📄 **PDF Upload**: Upload PDF files and extract text for context
- 🧵 **Thread Management**: Create and manage multiple conversation threads
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- ✨ **Modern UI**: Beautiful gradient design with smooth animations

## Project Structure

```
Frontend/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/
│   │   ├── ChatWindow.js   # Main chat interface
│   │   ├── ChatWindow.css
│   │   ├── ThreadList.js   # Conversation thread list
│   │   ├── ThreadList.css
│   │   ├── PDFUpload.js    # PDF upload component
│   │   └── PDFUpload.css
│   ├── App.js              # Main app component
│   ├── App.css
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies
└── README.md              # This file
```

## Installation

1. Install dependencies:
```bash
cd Frontend
npm install
```

2. Make sure your backend is running on `http://localhost:8000`

## Running the Application

Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Building for Production

Create a production build:
```bash
npm run build
```

## API Integration

The app connects to the FastAPI backend at `http://localhost:8000` with endpoints:
- `GET /threads` - Get all conversation threads
- `POST /chat` - Send a message to the chatbot
- `POST /upload-pdf` - Upload a PDF file

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (irreversible)

## Technologies Used

- **React 18** - UI framework
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with gradients and animations
- **Create React App** - Build tooling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Environment Variables

If you need to change the API base URL, edit the `API_BASE_URL` in `App.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000';
```

## Troubleshooting

### CORS Errors
Make sure your backend has CORS enabled (it should be by default in main.py)

### Backend Connection Issues
Verify the backend is running on `http://localhost:8000`

### Port Already in Use
If port 3000 is already in use, React will prompt you to use a different port

## Future Enhancements

- [ ] Authentication/Login
- [ ] Message history export
- [ ] Dark mode
- [ ] Image upload support
- [ ] Text-to-speech
- [ ] Custom themes
