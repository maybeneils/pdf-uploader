import React from 'react';
import {
  FileText,
  FileCheck,
  Eye,
  Download,
  Trash2,
  Copy,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { formatBytes, formatDate } from '../utils/fileHelpers';

export default function FileCard({ file, onPreview, onDownload, onDelete, onCopyInfo }) {
  const isPdf = file.type === 'pdf';
  const isUploading = file.status === 'uploading';
  const isError = file.status === 'error';

  return (
    <div className="file-card animate-fade-in">
      <div className="file-card-main">
        <div className="file-info-group">
          <div className={`file-type-icon ${isPdf ? 'pdf' : 'word'}`}>
            {isPdf ? <FileText size={24} /> : <FileCheck size={24} />}
          </div>

          <div className="file-meta">
            <h4 className="file-name" title={file.name}>
              {file.name}
            </h4>
            <div className="file-submeta">
              <span>{formatBytes(file.size)}</span>
              <span>•</span>
              <span>
                <Clock size={12} /> {formatDate(file.timestamp)}
              </span>
              <span>•</span>
              <span className={`status-badge ${file.status}`}>
                {file.status === 'completed' && <CheckCircle2 size={12} style={{ display: 'inline', marginRight: 3 }} />}
                {file.status === 'error' && <AlertCircle size={12} style={{ display: 'inline', marginRight: 3 }} />}
                {file.status}
              </span>
            </div>
          </div>
        </div>

        <div className="file-actions">
          <button
            className="icon-btn preview"
            onClick={() => onPreview(file)}
            title="Preview Document"
            aria-label="Preview"
          >
            <Eye size={17} />
          </button>

          <button
            className="icon-btn download"
            onClick={() => onDownload(file)}
            title="Download Document"
            aria-label="Download"
          >
            <Download size={17} />
          </button>

          <button
            className="icon-btn"
            onClick={() => onCopyInfo(file)}
            title="Copy Document Info"
            aria-label="Copy Info"
          >
            <Copy size={17} />
          </button>

          <button
            className="icon-btn delete"
            onClick={() => onDelete(file.id)}
            title="Delete Document"
            aria-label="Delete"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      {isUploading && (
        <div className="progress-wrapper">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${file.progress || 0}%` }}
            />
          </div>
          <span className="progress-text">{file.progress || 0}%</span>
        </div>
      )}
    </div>
  );
}
