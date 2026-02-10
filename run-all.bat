@echo off
REM This script starts both the backend and frontend servers

echo.
echo ================================
echo   ChatBot Full Stack Startup
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed!
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo ✓ Node.js and Python are installed
echo.

REM Start Backend
echo Starting Backend Server...
start cmd /k "cd Backend && python -m pip install fastapi uvicorn langchain-groq langchain langchain-core langgraph pypdf python-multipart python-dotenv && python -m uvicorn main:app --reload --port 8000"
timeout /t 3 /nobreak

REM Install and Start Frontend
echo Starting Frontend Server...
start cmd /k "cd Frontend && npm install && npm start"

echo.
echo ✓ Both servers are starting!
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this command window...
pause >nul
