@echo off
echo ========================================================
echo Starting Local AI & LLM Exam Prep Portal (Next.js)...
echo ========================================================
cd /d "%~dp0exam-review-app"
start http://localhost:3000
npm run dev
