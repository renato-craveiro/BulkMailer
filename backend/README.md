# BulkMailer Backend

This folder contains the backend server for BulkMailer, a bulk email sending and reporting system. The backend is built with Node.js and Express, providing RESTful APIs for sending emails, viewing logs, and accessing reports.

## Features
- Send bulk emails using CSV data and HTML templates
- Support for image attachments and inline images
- Generate and store email sending reports
- View and filter server logs
- API endpoints for integration with CLI and frontend
- Environment variable configuration
- Docker support for easy deployment

## Folder Structure
```
backend/
├── .dockerignore           # Docker ignore file
├── .env                    # Environment variables (not tracked)
├── .env.example            # Example environment configuration
├── app.log                 # Application log file
├── Dockerfile              # Docker build instructions
├── email_report_*.txt      # Generated email sending reports
├── index.js                # Backend server entry point
├── package.json            # Project dependencies and metadata
├── config/                 # Configuration files
│   ├── logger.js           # Winston logger setup
│   └── mailer.js           # Nodemailer transporter setup
├── routes/                 # Express route handlers
│   ├── emails.js           # Email sending endpoint
│   ├── logs.js             # Logs endpoint
│   └── reports.js          # Reports endpoint
├── uploads/                # Uploaded files (images, etc.)
│   └── ...                 # Uploaded image files
└── utils/                  # Utility functions
    └── helpers.js          # Helper functions for string formatting
```

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment**
   - Copy `.env.example` to `.env` and set your SMTP and other variables.
3. **Run the backend server**
   ```bash
   node index.js
   ```
   Or use Docker:
   ```bash
   docker build -t bulkmailer-backend .
   docker run -p 4000:4000 bulkmailer-backend
   ```

## API Endpoints
- `POST /send-emails` : Send bulk emails with CSV data and HTML template
- `GET /logs` : Retrieve and filter server logs
- `GET /reports` : List or fetch email sending reports

## Environment Variables
- `SMTP_HOST` : SMTP server host for sending emails
- `MAIL_FROM` : Default sender email address
- `PORT` : Server port (default: 4000)

## Docker
- The backend can be built and run as a Docker container using the provided `Dockerfile`.
- Volumes are used for uploads and logs to persist data.

## License
MIT

## Author
Renato Craveiro
