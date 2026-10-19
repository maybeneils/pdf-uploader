export function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function getFileType(filename, mimeType = '') {
  const ext = (filename.split('.').pop() || '').toLowerCase();
  
  if (ext === 'pdf' || mimeType.includes('pdf')) {
    return 'pdf';
  }
  if (
    ext === 'doc' ||
    ext === 'docx' ||
    mimeType.includes('word') ||
    mimeType.includes('officedocument.wordprocessingml')
  ) {
    return 'word';
  }
  return 'unsupported';
}

export function isValidDocument(file) {
  const type = getFileType(file.name, file.type);
  return type === 'pdf' || type === 'word';
}

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
