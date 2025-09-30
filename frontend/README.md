
# BulkMailer Frontend

This folder contains the frontend for BulkMailer, a bulk email sending and reporting system. The frontend is built with React, Vite, and Material UI, providing a modern interface for sending emails, uploading templates, viewing reports, and more.

## Features
- Send bulk emails using CSV data and HTML templates
- Upload and edit email templates with CKEditor
- View and filter email sending reports
- Switch between light and dark themes
- Multi-language support (English and Portuguese)
- Responsive design for desktop and mobile

## Folder Structure
```
frontend/
├── .dockerignore            # Docker ignore file
├── .env                     # Environment variables (not tracked)
├── .env.production          # Production environment variables
├── .gitignore               # Git ignore file
├── Dockerfile.prod          # Docker build instructions for production
├── eslint.config.js         # ESLint configuration
├── index.html               # Main HTML file
├── package.json             # Project dependencies and metadata
├── README.md                # Project documentation
├── vite.config.js           # Vite configuration
├── ckeditor5-build-classic/ # CKEditor build and config
├── public/                  # Static assets
│   ├── mail.svg
│   └── vite.svg
├── src/                     # Source code
│   ├── App.css              # Main app styles
│   ├── App.jsx              # Main app component
│   ├── i18n.js              # i18n configuration
│   ├── index.css            # Global styles
│   ├── main.jsx             # App entry point
│   ├── assets/              # Asset files
│   ├── components/          # React components
│   │   ├── EmailForm/       # Email form components
│   │   └── Layout/          # Layout components
│   ├── locales/             # Translation files
│   │   ├── en.json
│   │   └── pt.json
│   └── utils/               # Utility functions
│       └── formHandlers.js
```

## Getting Started
1. **Install dependencies**
	```bash
	npm install
	```
2. **Configure environment**
	- Copy `.env.example` to `.env` and set your variables (e.g., `VITE_API_BASE_URL`).
3. **Run the frontend**
	```bash
	npm run dev
	```
	Or build for production:
	```bash
	npm run build
	npm run preview
	```

## Main Features
- **Email Form:** Fill out sender, reply-to, CC/BCC, subject, and upload CSV/HTML files.
- **Template Editor:** Edit HTML templates with CKEditor and upload images.
- **Reports:** View email sending reports and filter by date.
- **Theme Switcher:** Toggle between light and dark mode.
- **Language Switcher:** Switch between English and Portuguese.

## Environment Variables
- `VITE_API_BASE_URL` : The base URL for the BulkMailer backend API

## Docker
- The frontend can be built and run as a Docker container using the provided `Dockerfile.prod`.

## License
MIT

## Author
Renato Craveiro
