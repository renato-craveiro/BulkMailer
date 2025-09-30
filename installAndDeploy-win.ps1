# BulkMailer install and deploy script for Windows systems
# Installs Node.js and Docker Desktop if missing, then builds and runs the project with Docker Compose

# --- 0. Ask if user wants to run configuration script ---
$choice = Read-Host "Do you want to configure API_BASE_URL and SMTP_HOST? Press Enter to skip or type 'y' to configure [Enter=skip]"

if ($choice -eq 'y') {
    $updateScript = ".\update-config-win.ps1"
    if (Test-Path $updateScript) {
        Write-Host "Running configuration script..."
        & $updateScript
        Write-Host "Configuration script finished."
    } else {
        Write-Host "Configuration script not found: $updateScript"
        exit 1
    }
} else {
    Write-Host "Skipping configuration script. Using default values."
}

# --- 1. Install Node.js if not installed ---
# Check if Node.js is installed; if not, install it using winget
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js not found. Installing via winget..."
    winget install OpenJS.NodeJS.LTS -e --source winget
} else {
    Write-Host "Node.js is already installed."
}

# --- 2. Install Docker Desktop if not installed ---
# Check if Docker is installed; if not, install Docker Desktop using winget
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker not found. Installing Docker Desktop via winget..."
    winget install Docker.DockerDesktop -e --source winget
} else {
    Write-Host "Docker is already installed."
}

# --- 3. Run docker-compose up --build ---
# Build and start all services in the background using Docker Compose
Write-Host "Running docker-compose up --build..."
docker-compose up -d --build
if ($LASTEXITCODE -ne 0) {
    Write-Host "docker-compose failed"
    exit 1
}

# --- 4. Call previous script ---
# Run CLI install script to set environment variables and build CLI
Write-Host "Calling previous script to set environment variable and run npm build..."
.\cli\install-win.ps1