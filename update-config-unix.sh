#!/bin/bash
# update-config-unix.sh
# Executable on Unix/Linux/macOS

echo "=== BulkMailer Configuration (Unix/Linux/macOS) ==="

# --- 1. Ask the user for input ---
read -p "Enter the value for API_BASE_URL (e.g., http://localhost:4000): " apiBaseUrl
read -p "Enter the value for SMTP_HOST (e.g., smtp.company.com): " smtpHost
read -p "Enter the value for SMTP_PORT (e.g., 587): " smtpPort
# --- 2. Modify install-win.ps1 ---
installPath="./cli/install-unix.sh"
if [ -f "$installPath" ]; then
    # Replace the value of $envValue while keeping the variable name intact
    sed -i.bak "s|\(\VAR_VALUE\s*=\s*\)\".*\"|\1\"$apiBaseUrl\"|" "$installPath"
    echo "install-unix.sh updated with new API_BASE_URL"
else
    echo "install-win.ps1 not found"
fi

# --- 3. Copy and modify .env ---
envExample="./backend/.env.example"
envFile="./backend/.env"

if [ -f "$envExample" ]; then
    cp "$envExample" "$envFile"
    sed -i.bak "s|^SMTP_HOST=.*|SMTP_HOST=$smtpHost|" "$envFile"
    echo "./backend/.env created/updated with new SMTP_HOST"
else
    echo ".env.example not found in ./backend/"
fi

if [ -f "$envExample" ]; then
    cp "$envExample" "$envFile"
    sed -i.bak "s|^SMTP_PORT=.*|SMTP_PORT=$smtpPort|" "$envFile"
    echo "./backend/.env created/updated with new SMTP_PORT"
else
    echo ".env.example not found in ./backend/"
fi

# --- 4. Modify VITE_API_BASE_URL in docker-compose.yml ---
dockerCompose="./docker-compose.yml"
if [ -f "$dockerCompose" ]; then
    # Replace the value while preserving indentation
    sed -i.bak "s|^\(\s*VITE_API_BASE_URL:\s*\).*|\1$apiBaseUrl|" "$dockerCompose"
    echo "docker-compose.yml updated with new VITE_API_BASE_URL"
else
    echo "docker-compose.yml not found"
fi

echo "Configuration update completed!"
