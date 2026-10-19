import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import DropZone from './components/DropZone';
import FileCard from './components/FileCard';
import PreviewModal from './components/PreviewModal';
import ToastContainer from './components/ToastContainer';
import { Search, FolderOpen, ArrowUpDown, Filter, Sparkles } from 'lucide-react';
import { getFileType, isValidDocument, formatBytes } from './utils/fileHelpers';
import './App.css';

// Sample demo documents so the uploader has rich interactive state on launch
const INITIAL_DEMO_FILES = [
  {
    id: 'demo-pdf-1',
    name: 'Project_Proposal_2026.pdf',
    size: 2450000,
    type: 'pdf',
    status: 'completed',
    progress: 100,
    timestamp: Date.now() - 3600000 * 2,
    url: null,
  },
  {
    id: 'demo-doc-2',
    name: 'Software_Requirements_Specification.docx',
    size: 1180000,
    type: 'word',
    status: 'completed',
    progress: 100,
    timestamp: Date.now() - 3600000 * 5,
    url: null,
  },
];

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('docudrop-theme') || 'dark';
  });
  const [files, setFiles] = useState(INITIAL_DEMO_FILES);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pdf' | 'word'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [previewFile, setPreviewFile] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Theme synchronization
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('docudrop-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Upload and process incoming files
  const handleFilesSelected = (incomingFiles) => {
    const maxSizeBytes = 50 * 1024 * 1024; // 50MB
    let addedCount = 0;

    incomingFiles.forEach((file) => {
      const docType = getFileType(file.name, file.type);

      // Validate file type
      if (docType === 'unsupported') {
        addToast(
          `"${file.name}" is not supported. Please upload only PDF or Word (.docx/.doc) files.`,
          'warning'
        );
        return;
      }

      // Validate file size
      if (file.size > maxSizeBytes) {
        addToast(
          `"${file.name}" exceeds the 50MB limit (${formatBytes(file.size)}).`,
          'error'
        );
        return;
      }

      // Check duplicates
      const isDuplicate = files.some(
        (f) => f.name === file.name && f.size === file.size
      );
      if (isDuplicate) {
        addToast(`"${file.name}" is already in your document list.`, 'info');
        return;
      }

      // Create new file object with blob URL
      const fileId = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      const objectUrl = URL.createObjectURL(file);

      const newFileItem = {
        id: fileId,
        rawFile: file,
        name: file.name,
        size: file.size,
        type: docType,
        status: 'uploading',
        progress: 10,
        timestamp: Date.now(),
        url: objectUrl,
      };

      setFiles((prev) => [newFileItem, ...prev]);
      addedCount += 1;

      // Simulate smooth upload progression
      let currentProgress = 15;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 20) + 15;

        if (currentProgress >= 100) {
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? { ...f, progress: 100, status: 'completed' }
                : f
            )
          );
          addToast(`"${file.name}" uploaded successfully!`, 'success');
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId ? { ...f, progress: currentProgress } : f
            )
          );
        }
      }, 140);
    });

    if (addedCount > 0) {
      setActiveFilter('all');
    }
  };

  // Preview Handler
  const handlePreview = (file) => {
    setPreviewFile(file);
  };

  // Download Handler
  const handleDownload = (file) => {
    if (file.url) {
      const a = document.createElement('a');
      a.href = file.url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      addToast(`Downloading "${file.name}"...`, 'info');
    } else {
      // Fallback for demo file or mock data
      const blob = new Blob([`Sample document content for ${file.name}`], {
        type: file.type === 'pdf' ? 'application/pdf' : 'application/msword',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addToast(`Downloaded demo document "${file.name}"`, 'info');
    }
  };

  // Delete Handler
  const handleDelete = (id) => {
    const target = files.find((f) => f.id === id);
    if (target && target.url) {
      URL.revokeObjectURL(target.url);
    }
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (target) {
      addToast(`Removed "${target.name}"`, 'info');
    }
  };

  // Clear all handler
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all uploaded documents?')) {
      files.forEach((f) => {
        if (f.url) URL.revokeObjectURL(f.url);
      });
      setFiles([]);
      addToast('All documents cleared.', 'info');
    }
  };

  // Copy info handler
  const handleCopyInfo = (file) => {
    const text = `Document: ${file.name}\nType: ${file.type.toUpperCase()}\nSize: ${formatBytes(
      file.size
    )}\nStatus: ${file.status}`;
    navigator.clipboard.writeText(text);
    addToast('Document details copied to clipboard!', 'info');
  };

  // Filtered and Sorted Documents
  const filteredFiles = useMemo(() => {
    return files
      .filter((file) => {
        // Category filter
        if (activeFilter === 'pdf' && file.type !== 'pdf') return false;
        if (activeFilter === 'word' && file.type !== 'word') return false;

        // Search query
        if (
          searchQuery.trim() &&
          !file.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'size-desc') {
          return (b.size || 0) - (a.size || 0);
        }
        // date-desc default
        return (b.timestamp || 0) - (a.timestamp || 0);
      });
  }, [files, activeFilter, searchQuery, sortBy]);

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onClearAll={handleClearAll}
        fileCount={files.length}
      />

      {/* Metrics & Statistics */}
      <StatsBar files={files} />

      {/* Drag and Drop Zone */}
      <DropZone onFilesSelected={handleFilesSelected} />

      {/* Toolbar: Search, Filters & Sort */}
      <section className="toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search documents by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills" role="tablist">
            <button
              className={`pill-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Files ({files.length})
            </button>
            <button
              className={`pill-btn ${activeFilter === 'pdf' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pdf')}
            >
              PDFs ({files.filter((f) => f.type === 'pdf').length})
            </button>
            <button
              className={`pill-btn ${activeFilter === 'word' ? 'active' : ''}`}
              onClick={() => setActiveFilter('word')}
            >
              Word Docs ({files.filter((f) => f.type === 'word').length})
            </button>
          </div>
        </div>

        <div className="toolbar-right">
          <div className="filter-pills" style={{ padding: '0.2rem 0.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.775rem',
                color: 'var(--text-muted)',
                marginRight: '0.4rem',
              }}
            >
              <ArrowUpDown size={13} /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="date-desc">Newest First</option>
              <option value="name-asc">Name (A - Z)</option>
              <option value="size-desc">Largest Size</option>
            </select>
          </div>
        </div>
      </section>

      {/* Document List Section */}
      <section className="file-list-section">
        <div className="file-list-header">
          <h3>
            <span>Uploaded Documents</span>
            <span className="badge-count">{filteredFiles.length}</span>
          </h3>
        </div>

        {filteredFiles.length > 0 ? (
          <div className="files-grid">
            {filteredFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onPreview={handlePreview}
                onDownload={handleDownload}
                onDelete={handleDelete}
                onCopyInfo={handleCopyInfo}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FolderOpen size={30} />
            </div>
            <h4>No documents found</h4>
            <p>
              {searchQuery
                ? `No files matching "${searchQuery}". Try adjusting your search or filters.`
                : 'Drag and drop your PDF or Word documents above to get started.'}
            </p>
          </div>
        )}
      </section>

      {/* Interactive Preview Modal */}
      <PreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
        onDownload={handleDownload}
      />

      {/* Feedback Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
