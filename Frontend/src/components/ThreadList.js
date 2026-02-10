import React from 'react';
import './ThreadList.css';

function ThreadList({ threads, currentThreadId, onSelectThread }) {
  return (
    <div className="thread-list">
      {threads.length === 0 ? (
        <div className="no-threads">
          <p>No conversations yet</p>
        </div>
      ) : (
        <ul>
          {threads.map(thread => (
            <li
              key={thread}
              className={`thread-item ${currentThreadId === thread ? 'active' : ''}`}
              onClick={() => onSelectThread(thread)}
            >
              <span className="thread-icon">💬</span>
              <span className="thread-name">{thread}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ThreadList;
