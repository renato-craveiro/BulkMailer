#!/bin/bash
# BulkMailer install and deploy script for Unix/Linux/macOS
# Installs Node.js and Docker if missing, then builds and runs the project with Docker Compose

echo "=== BulkMailer Install and Deploy (Unix/Linux/macOS) ==="

# --- 0. Ask if user wants to run configuration script ---
read -p "Do you want to configure API_BASE_URL and SMTP_HOST? Press Enter to skip or type 'y' to configure [Enter=skip]: " choice

if [ "$choice" = "y" ]; then
    updateScript="./update-config-unix.sh"
    if [ -f "$updateScript" ]; then
        echo "Running configuration script..."
        bash "$updateScript"
        echo "Configuration script finished."
    else
        echo "Configuration script not found: $updateScript"
        exit 1
    fi
else
    echo "Skipping configuration script. Using default values."
fi

# --- 1. Install Node.js if not installed ---
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing..."
    if [ -f /etc/debian_version ]; then
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif command -v brew &> /dev/null; then
        brew install node
    else
        echo "Please install Node.js manually."
        exit 1
    fi
else
    echo "Node.js is already installed."
fi

# --- 2. Install Docker if not installed ---
if ! command -v docker &> /dev/null; then
    echo "Docker not found. Installing..."
    if [ -f /etc/debian_version ]; then
        sudo apt-get update
        sudo apt-get install -y docker.io docker-compose
    elif command -v brew &> /dev/null; then
        brew install --cask docker
    else
        echo "Please install Docker manually."
        exit 1
    fi
else
    echo "Docker is already installed."
fi

# --- 3. Run docker-compose up --build ---
echo "Running docker-compose up --build..."
docker-compose up -d --build
if [ $? -ne 0 ]; then
    echo "docker-compose failed"
    exit 1
fi

# --- 4. Call CLI install script ---
cliScript="./cli/install-unix.sh"
if [ -f "$cliScript" ]; then
    echo "Calling previous script to set environment variable and run npm build..."
    bash "$cliScript"
else
    echo "CLI install script not found: $cliScript"
    exit 1
fi
