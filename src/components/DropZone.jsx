import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, FileCheck, ShieldAlert, FolderOpen } from 'lucide-react';

export default function DropZone({ onFilesSelected, maxSizeBytes = 50 * 1024 * 1024 }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = ''; // Reset input to allow re-upload of same file
    }
  };

  const handleTriggerBrowse = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`dropzone-container ${isDragging ? 'is-dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleTriggerBrowse}
      role="button"
      tabIndex={0}
      aria-label="Upload PDF or Word Documents"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTriggerBrowse();
        }
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />

      <div className="dropzone-content">
        <div className="dropzone-icon-circle">
          <UploadCloud size={36} />
        </div>

        <div>
          <h2 className="dropzone-title">Drag & drop your files here, or click to browse</h2>
          <p className="dropzone-subtitle">
            Upload single or multiple PDF documents and Word (.docx, .doc) files quickly with instant preview
          </p>
        </div>

        <button
          type="button"
          className="browse-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleTriggerBrowse();
          }}
        >
          <FolderOpen size={18} />
          <span>Browse Files</span>
        </button>

        <div className="dropzone-badges">
          <span className="format-badge pdf">
            <FileText size={14} /> PDF (.pdf)
          </span>
          <span className="format-badge word">
            <FileCheck size={14} /> Word (.docx, .doc)
          </span>
          <span className="format-badge limit">
            <ShieldAlert size={14} /> Max Size: 50 MB
          </span>
        </div>
      </div>
    </div>
  );
}
