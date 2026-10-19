import React, { useEffect } from 'react';
import { X, Download, ExternalLink, FileText, FileCheck, Info } from 'lucide-react';
import { formatBytes, formatDate } from '../utils/fileHelpers';

export default function PreviewModal({ file, onClose, onDownload }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!file) return null;

  const isPdf = file.type === 'pdf';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className={`format-badge ${isPdf ? 'pdf' : 'word'}`}>
              {isPdf ? <FileText size={14} /> : <FileCheck size={14} />}
              {isPdf ? 'PDF' : 'Word DOCX'}
            </span>
            <h3 className="modal-title" title={file.name}>
              {file.name}
            </h3>
          </div>

          <div className="modal-actions">
            {file.url && (
              <a
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="action-btn"
                title="Open in new window"
              >
                <ExternalLink size={15} />
                <span>Open in Tab</span>
              </a>
            )}

            <button
              className="action-btn"
              onClick={() => onDownload(file)}
              title="Download file"
            >
              <Download size={15} />
              <span>Download</span>
            </button>

            <button
              className="icon-btn"
              onClick={onClose}
              title="Close modal"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          {isPdf ? (
            file.url ? (
              <iframe
                src={`${file.url}#toolbar=1&navpanes=1`}
                className="pdf-iframe"
                title={file.name}
              />
            ) : (
              <div className="doc-preview-placeholder">
                <div className="doc-preview-icon" style={{ background: 'var(--pdf-bg)', color: 'var(--pdf-color)', border: '1px solid var(--pdf-border)' }}>
                  <FileText size={42} />
                </div>
                <h4>Sample PDF Document</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  This is a sample document entry. Upload your own .pdf file to inspect live pages in the interactive viewer.
                </p>
              </div>
            )
          ) : (
            <div className="doc-preview-placeholder">
              <div className="doc-preview-icon">
                <FileCheck size={42} />
              </div>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                Microsoft Word Document (.docx/.doc)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Word files contain formatted XML and styles. You can download or open it directly in Microsoft Word or Google Docs.
              </p>

              <div className="doc-info-table">
                <div className="doc-info-row">
                  <span className="doc-info-label">File Name:</span>
                  <span className="doc-info-value">{file.name}</span>
                </div>
                <div className="doc-info-row">
                  <span className="doc-info-label">File Size:</span>
                  <span className="doc-info-value">{formatBytes(file.size)}</span>
                </div>
                <div className="doc-info-row">
                  <span className="doc-info-label">File Format:</span>
                  <span className="doc-info-value">{file.name.endsWith('.docx') ? 'Office Open XML (.docx)' : 'Word 97-2003 (.doc)'}</span>
                </div>
                <div className="doc-info-row">
                  <span className="doc-info-label">Date Added:</span>
                  <span className="doc-info-value">{formatDate(file.timestamp)}</span>
                </div>
                <div className="doc-info-row">
                  <span className="doc-info-label">Status:</span>
                  <span className="doc-info-value" style={{ color: 'var(--success-color)' }}>
                    Verified & Ready
                  </span>
                </div>
              </div>

              <button
                className="browse-btn"
                style={{ marginTop: '0.5rem' }}
                onClick={() => onDownload(file)}
              >
                <Download size={16} />
                <span>Download Word Document</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
