import React from 'react';
import { Files, Moon, Sun, Trash2, Webhook } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onClearAll, fileCount, webhookUrl }) {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <Files size={24} />
        </div>
        <div className="brand-info">
          <h1>DocuDrop</h1>
          <p>Fast PDF & Word Document Uploader</p>
        </div>
      </div>

      <div className="nav-actions">
        {webhookUrl && (
          <div className="webhook-badge" title={`Auto-forwarding uploads to: ${webhookUrl}`}>
            <span className="webhook-dot"></span>
            <Webhook size={14} />
            <span className="webhook-text">n8n Webhook Connected</span>
          </div>
        )}

        {fileCount > 0 && (
          <button
            className="action-btn danger"
            onClick={onClearAll}
            title="Clear all files"
          >
            <Trash2 size={16} />
            <span>Clear All</span>
          </button>
        )}

        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
