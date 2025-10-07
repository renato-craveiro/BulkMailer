# update-config-win.ps1
# Executable on Windows via PowerShell

param()

Write-Host "=== BulkMailer Configuration (Windows) ==="

# --- 1. Ask the user for input ---
$apiBaseUrl = Read-Host "Enter the value for API_BASE_URL (e.g., http://localhost:4000)"
$smtpHost = Read-Host "Enter the value for SMTP_HOST (e.g., smtp.company.com)"
$smtpPort = Read-Host "Enter the value for SMTP_PORT (e.g., 587)"
~

# --- 2. Modify install-win.ps1 ---
$installPath = ".\cli\install-win.ps1"
if (Test-Path $installPath) {
    (Get-Content $installPath) -replace '(\$envValue\s*=\s*").*(")', "`$1$apiBaseUrl`$2" | Set-Content $installPath
    Write-Host "install-win.ps1 updated with new API_BASE_URL"
} else {
    Write-Host "install-win.ps1 not found"
}

# --- 3. Copy and modify .env ---
$envExamplePath = ".\backend\.env.example"
$envPath = ".\backend\.env"

if (Test-Path $envExamplePath) {
    Copy-Item $envExamplePath $envPath -Force
    (Get-Content $envPath) -replace '^SMTP_HOST=.*$', "SMTP_HOST=$smtpHost" | Set-Content $envPath 
    Write-Host ".\backend\.env created/updated with new SMTP_HOST"
} else {
    Write-Host ".env.example not found in ./backend/"
}

if (Test-Path $envExamplePath) {
    Copy-Item $envExamplePath $envPath -Force
    (Get-Content $envPath) -replace '^SMTP_PORT=.*$', "SMTP_PORT=$smtpPort" | Set-Content $envPath
    Write-Host ".\backend\.env created/updated with new SMTP_PORT"
} else {
    Write-Host ".env.example not found in ./backend/"
}

# --- 4. Modify VITE_API_BASE_URL in docker-compose.yml ---
$dockerComposePath = ".\docker-compose.yml"
if (Test-Path $dockerComposePath) {
    $dockerContent = Get-Content $dockerComposePath
    $dockerContent = $dockerContent | ForEach-Object {
        if ($_ -match '^\s*VITE_API_BASE_URL:') {
            # Preserve indentation and replace only the value after ": "
            ($_ -replace '^(\s*VITE_API_BASE_URL:\s*).*', "`$1$apiBaseUrl")
        } else {
            $_
        }
    }
    Set-Content -Path $dockerComposePath -Value $dockerContent
    Write-Host "docker-compose.yml updated with new VITE_API_BASE_URL"
} else {
    Write-Host "docker-compose.yml not found"
}

Write-Host "Configuration update completed!"
