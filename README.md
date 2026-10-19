# DocuDrop — PDF & Word Document Uploader (React)

A modern, fast, and responsive React web application specifically designed to upload, preview, validate, and manage **PDF** and **Word** documents (`.pdf`, `.docx`, `.doc`).

## ✨ Features

- **Drag & Drop Zone**: Interactive drop zone with glowing hover effects, drag-state feedback, and browse dialog.
- **Strict File Format Validation**: Only permits `.pdf`, `.docx`, and `.doc` files. Automatically detects and warns on unsupported formats.
- **File Size Validation**: Configurable limits (up to 50 MB) with clear feedback toasts.
- **Live Upload Simulation**: Realistic progress bar with speed calculation and upload status (`Uploading`, `Completed`, `Error`).
- **In-Browser Document Previewer**:
  - **PDF Documents**: Direct embedded interactive PDF viewer with zoom, page navigation, and fullscreen capabilities.
  - **Word Documents**: Document inspector displaying metadata, size, date, file format, and one-click download/open triggers.
- **Search, Filter & Sorting**:
  - Filter by: `All Files`, `PDFs`, or `Word Docs`.
  - Instant live search by file name.
  - Sort by `Newest First`, `Name (A-Z)`, or `Largest Size`.
- **Metrics & Stats Bar**: Real-time counter of total documents, PDF count, Word document count, and combined storage used.
- **Dark & Light Mode**: Smooth theme switcher with custom CSS variables and glassmorphism styling.
- **Batch Actions**: One-click "Clear All" with confirmation, copy file metadata to clipboard, and instant download.

---

## 🚀 How to Run

The development server is already running on **http://localhost:5173/**.

To run it anytime manually:
```bash
npm install
npm run dev
```

To build for production:
```bash
npm run build
```
