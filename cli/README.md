# BulkMailer CLI

This folder contains the command-line interface (CLI) for BulkMailer, a tool for sending bulk emails, viewing reports, and checking logs via terminal commands or interactive prompts.

## Features
- Send email batches using CSV data and HTML templates
- View and filter email sending reports
- Check server logs with optional filters
- Interactive mode for guided usage
- Environment variable support via `.env` files

## Folder Structure
```
cli/
├── .env                # Environment variables (not tracked)
├── .env.example        # Example environment configuration
├── config.js           # Loads environment variables and sets configuration
├── index.js            # CLI entry point
├── install-unix.sh     # Unix install script
├── install-win.ps1     # Windows install script
├── interactive.js      # Interactive CLI logic
├── package.json        # CLI dependencies and metadata
├── utils.js            # Utility functions
├── build/              # Build output (if any)
└── commands/           # CLI command modules
    ├── logs.js         # Fetch and display logs
    ├── reports.js      # Fetch, filter, and display reports
    └── send.js         # Send emails
```

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment**
   - Copy `.env.example` to `.env` and set your variables (e.g., `API_BASE_URL`).
3. **Run the CLI**
   - Interactive mode:
     ```bash
     node index.js
     ```
   - Direct commands:
     ```bash
     node index.js send --file data.csv --template email.html --subject "Hello!"
     node index.js reports
     node index.js logs
     ```

## Commands
- `send` : Send emails using a CSV file and HTML template
- `reports` : View and filter email sending reports
- `logs` : Check server logs

## Interactive Mode
If you run the CLI without arguments, it launches an interactive prompt to guide you through sending emails, viewing reports, or checking logs.

## Environment Variables
- `API_BASE_URL` : The base URL for the BulkMailer backend API

## License
MIT

## Author
Renato Craveiro
