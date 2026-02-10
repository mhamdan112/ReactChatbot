import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';

function ChatWindow({ messages, loading, onSendMessage }) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendClick = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <div className="empty-icon">💬</div>
            <p>Start a conversation!</p>
            <p className="empty-subtitle">Type your message below to begin chatting with the bot.</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role}`}
              >
                <div className="message-box">
                  <div className="message-role">
                    {message.role === 'user' && '👤 You'}
                    {message.role === 'bot' && '🤖 Bot'}
                    {message.role === 'system' && '⚙️ System'}
                  </div>
                  <div className="message-content">
                    {message.content}
                  </div>
                  <div className="message-time">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message bot loading">
                <div className="message-box">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="input-area">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here... (Shift+Enter for new line)"
          disabled={loading}
          className="message-input"
        />
        <button
          onClick={handleSendClick}
          disabled={loading || !inputValue.trim()}
          className="send-btn"
        >
          {loading ? '⏳' : '📤'} Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
