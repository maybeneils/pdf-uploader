import React from 'react';
import { Files, Moon, Sun, Trash2 } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onClearAll, fileCount }) {
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
