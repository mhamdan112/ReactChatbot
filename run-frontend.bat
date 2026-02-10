@echo off
REM This script starts just the frontend server (when backend is already running)

echo.
echo =======================
echo   ChatBot Frontend Start
echo =======================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed
echo.

cd Frontend

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies (first time only)...
    call npm install
    echo.
)

echo Starting Frontend Server...
call npm start

pause
