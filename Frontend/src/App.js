import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ChatWindow from './components/ChatWindow';
import ThreadList from './components/ThreadList';
import PDFUpload from './components/PDFUpload';

const API_BASE_URL = 'https://reactchatbot-production.up.railway.app/';

function App() {
  const [threads, setThreads] = useState([]);
  const [currentThreadId, setCurrentThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedText, setUploadedText] = useState('');

  // Fetch threads on component mount
  useEffect(() => {
    fetchThreads();
  }, []);

  // Create default thread if none exist
  useEffect(() => {
    if (threads.length === 0 && !currentThreadId) {
      createNewThread();
    }
  }, [threads, currentThreadId]);

  // Fetch threads
  const fetchThreads = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/threads`);
      setThreads(response.data.threads);
      
      // Set first thread as default
      if (response.data.threads.length > 0 && !currentThreadId) {
        setCurrentThreadId(response.data.threads[0]);
      }
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };

  // Create new thread
  const createNewThread = () => {
    const newThreadId = `thread_${Date.now()}`;
    setCurrentThreadId(newThreadId);
    setMessages([]);
    setThreads([...threads, newThreadId]);
  };

  // Handle sending message
  const handleSendMessage = async (message) => {
    if (!currentThreadId || !message.trim()) return;

    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages([...messages, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/chat`,
        null,
        {
          params: {
            thread_id: currentThreadId,
            message: message,
            pdf_context: uploadedText  // Send PDF content to backend
          }
        }
      );

      const botMessage = {
        role: 'bot',
        content: response.data.response,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'bot',
        content: 'Error: Could not get response from chatbot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handle PDF upload
  const handlePDFUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/upload-pdf`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setUploadedText(response.data.text);
      
      // Add a system message about the uploaded PDF
      const systemMessage = {
        role: 'system',
        content: `PDF uploaded successfully! Text extracted: ${response.data.text.substring(0, 100)}...`,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, systemMessage]);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      const errorMessage = {
        role: 'system',
        content: 'Error uploading PDF file',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>ChatBot</h2>
          <button className="new-thread-btn" onClick={createNewThread}>
            + New Chat
          </button>
        </div>
        <ThreadList 
          threads={threads}
          currentThreadId={currentThreadId}
          onSelectThread={setCurrentThreadId}
        />
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Chat Interface</h1>
          <PDFUpload onUpload={handlePDFUpload} />
        </div>

        <ChatWindow 
          messages={messages}
          loading={loading}
          onSendMessage={handleSendMessage}
        />

        {uploadedText && (
          <div className="uploaded-text-info">
            <small>PDF text loaded in context</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
