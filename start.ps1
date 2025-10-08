# LU1 Keuzekompas - Full Stack Starter
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host " LU1 Keuzekompas - Full Stack" -ForegroundColor Cyan  
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Controleren van dependencies..." -ForegroundColor Yellow
Write-Host ""

# Backend dependencies
if (!(Test-Path "Backend\api-keuze-kompass-lu1\node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Green
    Set-Location "Backend\api-keuze-kompass-lu1"
    npm install
    Set-Location "..\..\" 
}

# Frontend dependencies
if (!(Test-Path "Frontend\ClientKeuzeKompassLU1\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Green
    Set-Location "Frontend\ClientKeuzeKompassLU1"
    npm install
    Set-Location "..\..\" 
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host " Starting Both Applications..." -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend (NestJS): http://localhost:3000" -ForegroundColor Green
Write-Host "Frontend (Angular): http://localhost:4200" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both applications" -ForegroundColor Yellow
Write-Host ""

# Start backend en frontend in aparte terminals
Start-Process powershell -ArgumentList "cd Backend\api-keuze-kompass-lu1; npm run start:dev"
Start-Process powershell -ArgumentList "cd Frontend\ClientKeuzeKompassLU1; npm start"
