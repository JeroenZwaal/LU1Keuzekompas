@echo off
echo.
echo ================================
echo  LU1 Keuzekompas - Full Stack
echo ================================
echo.
echo Installeren van dependencies...
echo.

REM Backend dependencies
cd Backend\api-keuze-kompass-lu1
if not exist "node_modules" (
    echo Installing backend dependencies...
    npm install
)
cd ..\..

REM Frontend dependencies
cd Frontend\ClientKeuzeKompassLU1
if not exist "node_modules" (
    echo Installing frontend dependencies...
    npm install
)
cd ..\..

echo.
echo ================================
echo  Starting Both Applications...
echo ================================
echo.
echo Backend (NestJS): http://localhost:3000
echo Frontend (Angular): http://localhost:4200
echo.
echo Press Ctrl+C to stop both applications
echo.

REM Start backend and frontend in parallel
start cmd /k "cd Backend\api-keuze-kompass-lu1 && npm run start:dev"
start cmd /k "cd Frontend\ClientKeuzeKompassLU1 && npm start"

pause
