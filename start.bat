@echo off
echo ===================================================
echo     Plant Disease App - Startup Script
echo ===================================================
echo.
echo Starting the Backend and Frontend servers in new windows...

:: Start the Python Backend
start "Plant App - Python Backend" cmd /k "cd backend && echo Setting up Python Backend... && if not exist venv (python -m venv venv) && .\venv\Scripts\activate && pip install -r requirements.txt && echo. && echo Starting API Server on Port 8000... && uvicorn main:app --reload"

:: Wait 3 seconds to let backend start up
timeout /t 3 /nobreak > NUL

:: Start the React Frontend
start "Plant App - React Frontend" cmd /k "cd frontend && echo Setting up React Frontend... && npm install && echo. && echo Starting Web App... && npm run dev"

echo.
echo Both servers are launching!
echo A browser window with the app should open automatically soon.
echo If it doesn't, navigate to http://localhost:5173/ an your browser.
echo.
echo You can close this window now. The servers will keep running in the new windows.
pause
