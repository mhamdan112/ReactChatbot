@echo off
REM This script starts just the backend server (when frontend is already running)

echo.
echo =======================
echo   ChatBot Backend Start
echo =======================
echo.

REM Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed!
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo ✓ Python is installed
echo.

cd Backend

echo Checking for required packages...
python -m pip install fastapi uvicorn langchain-groq langchain langchain-core langgraph pypdf python-multipart python-dotenv

echo.
echo Starting Backend Server on http://localhost:8000
echo.
python -m uvicorn main:app --reload --port 8000

pause
