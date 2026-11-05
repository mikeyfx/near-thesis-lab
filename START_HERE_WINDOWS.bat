@echo off
cd /d "%~dp0"
python scripts\build_all.py
if errorlevel 1 (echo Python not found or build failed. Install Python 3.9+.; pause; exit /b 1)
echo Dashboard: http://localhost:8000
start "" cmd /c "timeout /t 2 >nul & start http://localhost:8000"
python -m http.server 8000 --directory web
pause
