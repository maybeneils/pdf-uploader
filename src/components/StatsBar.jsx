import React from 'react';
import { Files, FileText, HardDrive, FileCheck } from 'lucide-react';
import { formatBytes } from '../utils/fileHelpers';

export default function StatsBar({ files }) {
  const totalCount = files.length;
  const pdfCount = files.filter((f) => f.type === 'pdf').length;
  const wordCount = files.filter((f) => f.type === 'word').length;
  const totalBytes = files.reduce((acc, curr) => acc + (curr.size || 0), 0);

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon-wrapper total">
          <Files size={20} />
        </div>
        <div className="stat-details">
          <h4>Total Documents</h4>
          <span className="stat-value">{totalCount}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper pdf">
          <FileText size={20} />
        </div>
        <div className="stat-details">
          <h4>PDF Files</h4>
          <span className="stat-value">{pdfCount}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper word">
          <FileCheck size={20} />
        </div>
        <div className="stat-details">
          <h4>Word Docs</h4>
          <span className="stat-value">{wordCount}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper storage">
          <HardDrive size={20} />
        </div>
        <div className="stat-details">
          <h4>Total Size</h4>
          <span className="stat-value">{formatBytes(totalBytes)}</span>
        </div>
      </div>
    </section>
  );
}
