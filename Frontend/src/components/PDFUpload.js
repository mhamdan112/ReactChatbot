import React, { useState } from 'react';
import './PDFUpload.css';

function PDFUpload({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        uploadFile(file);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      uploadFile(file);
    } else {
      alert('Please select a PDF file');
    }
  };

  const uploadFile = async (file) => {
    setIsUploading(true);
    try {
      onUpload(file);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="pdf-upload">
      <label
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          disabled={isUploading}
          style={{ display: 'none' }}
        />
        <span className="upload-icon">
          {isUploading ? '⏳' : '📄'}
        </span>
        <span className="upload-text">
          {isUploading ? 'Uploading...' : 'Upload PDF'}
        </span>
      </label>
    </div>
  );
}

export default PDFUpload;
