# install-win.ps1
# --- Change to script directory to ensure npm works ---
Set-Location -Path $PSScriptRoot
# Define variable
$envName = "API_BASE_URL"
$envValue = "http://172.23.43:4000"

# Set permanent environment variable (User scope)
[System.Environment]::SetEnvironmentVariable($envName, $envValue, "User")
Write-Host "Environment variable $envName created/updated for the current user."

# Also set for current session
[System.Environment]::SetEnvironmentVariable($envName, $envValue, "Process")
Write-Host "Environment variable $envName is now available in this session."

# Install dependencies
Write-Host "Installing dependencies..."
npm install
if ($LASTEXITCODE -ne 0) { Write-Host "Error during npm install"; exit 1 }

# Run build
Write-Host "Running build..."
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Error during npm run build"; exit 1 }

Write-Host "Script finished successfully!"
Pause
