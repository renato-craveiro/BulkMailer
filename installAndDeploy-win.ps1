# --- 1. Install Node.js if not installed ---
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js not found. Installing via winget..."
    winget install OpenJS.NodeJS.LTS -e --source winget
} else {
    Write-Host "Node.js is already installed."
}

# --- 2. Install Docker Desktop if not installed ---
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker not found. Installing Docker Desktop via winget..."
    winget install Docker.DockerDesktop -e --source winget
} else {
    Write-Host "Docker is already installed."
}

# --- 3. Run docker-compose up --build ---
Write-Host "Running docker-compose up --build..."
docker-compose up -d --build
if ($LASTEXITCODE -ne 0) {
    Write-Host "docker-compose failed"
    exit 1
}

# --- 4. Call previous script ---
Write-Host "Calling previous script to set environment variable and run npm build..."
.\cli\install-win.ps1
