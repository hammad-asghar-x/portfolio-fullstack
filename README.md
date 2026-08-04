# Portfolio Fullstack Project

Personal portfolio website with admin portal and AI chatbot.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python, SQLAlchemy, SQLite
- **Chatbot**: RAG with ChromaDB, sentence-transformers
- **Authentication**: JWT

## Project Structure
portfolio-fullstack/
├── backend/ # FastAPI backend
├── frontend/ # Next.js frontend
└── README.md


## Local Development Setup

### Backend Setup

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# Mac/Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
python seed.py
python ingest.py
uvicorn app.main:app --reload --port 8000
