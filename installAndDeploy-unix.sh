#!/bin/bash

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
docker-compose up -d --build || { echo "docker-compose failed"; exit 1; }

# --- 4. Call previous script ---
echo "Calling previous script to set environment variable and run npm build..."
./cli/install-unix.sh
