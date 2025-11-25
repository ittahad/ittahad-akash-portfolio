# Firebase Deployment Script for Windows (PowerShell)
# Portfolio Website Deployment

Write-Host "Starting Firebase Deployment..." -ForegroundColor Cyan
Write-Host ""

# Check if Firebase CLI is installed
Write-Host "Checking Firebase CLI installation..." -ForegroundColor Yellow
$firebaseInstalled = Get-Command firebase -ErrorAction SilentlyContinue

if (-not $firebaseInstalled) {
    Write-Host "Firebase CLI not found!" -ForegroundColor Red
    Write-Host "Installing Firebase CLI..." -ForegroundColor Yellow
    npm install -g firebase-tools
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install Firebase CLI" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Firebase CLI installed successfully!" -ForegroundColor Green
} else {
    Write-Host "Firebase CLI is already installed" -ForegroundColor Green
}

Write-Host ""

# Check if user is logged in
Write-Host "Checking Firebase authentication..." -ForegroundColor Yellow
firebase projects:list 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in to Firebase" -ForegroundColor Yellow
    Write-Host "Opening Firebase login..." -ForegroundColor Cyan
    firebase login
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Firebase login failed" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Authenticated with Firebase" -ForegroundColor Green
Write-Host ""

# Check if .firebaserc exists and has a valid project
Write-Host "Checking Firebase project configuration..." -ForegroundColor Yellow

if (Test-Path ".firebaserc") {
    $firebaserc = Get-Content ".firebaserc" | ConvertFrom-Json
    $projectId = $firebaserc.projects.default
    
    if ($projectId -eq "your-project-id") {
        Write-Host "Firebase project not configured!" -ForegroundColor Yellow
        Write-Host "Please update .firebaserc with your Firebase project ID" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "You can:" -ForegroundColor White
        Write-Host "1. Run 'firebase use --add' to select a project" -ForegroundColor White
        Write-Host "2. Or manually edit .firebaserc and replace 'your-project-id'" -ForegroundColor White
        Write-Host ""
        
        $response = Read-Host "Do you want to select a project now? (y/n)"
        if ($response -eq "y" -or $response -eq "Y") {
            firebase use --add
            if ($LASTEXITCODE -ne 0) {
                Write-Host "Failed to configure Firebase project" -ForegroundColor Red
                exit 1
            }
        } else {
            Write-Host "Deployment cancelled" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "Using Firebase project: $projectId" -ForegroundColor Green
    }
} else {
    Write-Host ".firebaserc not found!" -ForegroundColor Yellow
    Write-Host "Initializing Firebase project..." -ForegroundColor Cyan
    firebase use --add
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to initialize Firebase project" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

# Deploy to Firebase
Write-Host "Deploying to Firebase Hosting..." -ForegroundColor Cyan
Write-Host ""

firebase deploy --only hosting

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your portfolio is now live!" -ForegroundColor Cyan
    Write-Host ""
    
    # Get the hosting URL
    $firebaserc = Get-Content ".firebaserc" | ConvertFrom-Json
    $projectId = $firebaserc.projects.default
    Write-Host "URL: https://$projectId.web.app" -ForegroundColor White
    Write-Host "Custom domain: https://$projectId.firebaseapp.com" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Deployment failed!" -ForegroundColor Red
    Write-Host "Please check the error messages above" -ForegroundColor Yellow
    exit 1
}
