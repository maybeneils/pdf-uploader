import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type || 'info'}`}>
          {toast.type === 'success' && <CheckCircle2 size={18} color="var(--success-color)" />}
          {toast.type === 'warning' && <AlertTriangle size={18} color="var(--warning-color)" />}
          {toast.type === 'error' && <AlertCircle size={18} color="var(--danger-color)" />}
          {(!toast.type || toast.type === 'info') && <Info size={18} color="var(--accent-primary)" />}

          <span className="toast-message">{toast.message}</span>

          <button
            className="icon-btn"
            style={{ width: 24, height: 24, marginLeft: 'auto', border: 'none', background: 'transparent' }}
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
