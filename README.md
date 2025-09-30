# BulkMailer

BulkMailer is a full-stack bulk email automation system designed for sending, tracking, and reporting mass emails. It consists of three main components: Backend (API server), Frontend (web interface), and CLI (command-line interface). The project is containerized with Docker and ready for deployment or local development.

---

## Project Structure

```
BulkMailer/
├── backend/      # Node.js Express API server for email, logs, and reports
├── cli/          # Node.js CLI for interactive and scripted email operations
├── frontend/     # React + Vite web interface for sending emails and viewing reports
├── docker-compose.yml
├── installAndDeploy-unix.sh
├── installAndDeploy-win.ps1
```

---

## Components Overview

### 1. Backend (`backend/`)
- **Purpose:** Handles email sending, logging, and report generation via REST API.
- **Tech:** Node.js, Express, Nodemailer, Winston
- **Endpoints:**
  - `POST /send-emails` — Send bulk emails with CSV and HTML template
  - `GET /logs` — Retrieve and filter logs
  - `GET /reports` — List or fetch email sending reports
- **Persistence:** Stores logs (`app.log`), reports (`email_report_*.txt`), and uploaded files (`uploads/`).
- **Environment:**
  - `SMTP_HOST` — SMTP server for sending emails
  - `MAIL_FROM` — Default sender address
  - `PORT` — API port (default: 4000)

### 2. Frontend (`frontend/`)
- **Purpose:** User-friendly web interface for sending emails, uploading templates, viewing reports, and switching themes/languages.
- **Tech:** React, Vite, Material UI, CKEditor
- **Features:**
  - Email form with CSV/HTML upload
  - CKEditor for template editing
  - Report viewer and filter
  - Light/dark mode, English/Portuguese support
- **Environment:**
  - `VITE_API_BASE_URL` — Backend API URL

### 3. CLI (`cli/`)
- **Purpose:** Command-line tool for scripted or interactive bulk email operations.
- **Tech:** Node.js, Commander, Inquirer
- **Features:**
  - Interactive mode for guided email sending
  - Direct commands for sending, viewing logs, and reports
- **Environment:**
  - `API_BASE_URL` — Backend API URL

---

## How Components Interact
- **Backend** exposes REST endpoints for email, logs, and reports.
- **Frontend** communicates with the backend via HTTP requests (using the API URL defined in `.env`).
- **CLI** also communicates with the backend via HTTP requests, either interactively or via direct commands.
- **Docker Compose** orchestrates both backend and frontend containers, ensuring proper networking and environment variable propagation.

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (for local development)
- [Docker](https://www.docker.com/) (for containerized deployment)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/BulkMailer.git
cd BulkMailer
```

### 2. Environment Configuration
- Copy `.env.example` to `.env` in each component folder (`backend/`, `frontend/`, `cli/`) and set the required variables.
- Example for `backend/.env`:
  ```env
  SMTP_HOST=smtp.example.com
  MAIL_FROM=your@email.com
  PORT=4000
  ```
- Example for `frontend/.env`:
  ```env
  VITE_API_BASE_URL=http://localhost:4000
  ```
- Example for `cli/.env`:
  ```env
  API_BASE_URL=http://localhost:4000
  ```

### 3. Local Development
- **Backend:**
  ```bash
  cd backend
  npm install
  npm start
  ```
- **Frontend:**
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- **CLI:**
  ```bash
  cd cli
  npm install
  node index.js
  ```

### 4. Docker Deployment
- Build and run all services:
  ```bash
  docker-compose up --build
  ```
- Or use the provided scripts (use "Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass" to enable the execution on windows):
  - Unix: `./installAndDeploy-unix.sh`
  - Windows: `./installAndDeploy-win.ps1`


---

## Environment Variables
- **Never commit real secrets to `.env` files.** Use `.env.example` for templates.
- `.gitignore` is set up to exclude `.env`, `node_modules`, build outputs, and other sensitive files.

---

## Usage
- Access the frontend at [http://localhost:5173](http://localhost:5173) (or mapped port).
- Use the CLI for interactive or scripted email operations.
- Backend API available at [http://localhost:4000](http://localhost:4000).

---

## License
MIT

## Author
Renato Craveiro
