from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .core.database import engine, Base

# Import Public Routers
from .routers import projects, experiences, skills, education, contact

app = FastAPI(title=settings.APP_NAME)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables on startup
@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Portfolio API is running"}

@app.get("/api/health")
def health_check():
    return {"success": True, "data": {"status": "ok"}}

# --- PUBLIC API ROUTES ---
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(experiences.router, prefix="/api/experiences", tags=["Experiences"])
app.include_router(skills.router, prefix="/api/skills", tags=["Skills"])
app.include_router(education.router, prefix="/api/education", tags=["Education"])
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])