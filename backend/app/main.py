from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .core.database import engine, Base

app = FastAPI(title=settings.APP_NAME)

# CORS setup (Allows your Next.js frontend to talk to this backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables on startup (Perfect for local SQLite MVP)
@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Portfolio API is running"}

@app.get("/api/health")
def health_check():
    return {"success": True, "data": {"status": "ok"}}