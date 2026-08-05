from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from .core.config import settings
from .core.database import engine, Base

# Import Public Routers
from .routers import projects, experiences, skills, education, contact
# Import Admin Routers
from .routers import admin_auth, admin_projects, admin_experiences, admin_skills, admin_education, admin_contacts

app = FastAPI(
    title=settings.APP_NAME,
    security_schemes={
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
)

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
app.include_router(projects.router, prefix="/api/projects", tags=["Public: Projects"])
app.include_router(experiences.router, prefix="/api/experiences", tags=["Public: Experiences"])
app.include_router(skills.router, prefix="/api/skills", tags=["Public: Skills"])
app.include_router(education.router, prefix="/api/education", tags=["Public: Education"])
app.include_router(contact.router, prefix="/api/contact", tags=["Public: Contact"])

# --- ADMIN API ROUTES ---
app.include_router(admin_auth.router, prefix="/api/admin", tags=["Admin: Auth"])
app.include_router(admin_projects.router, prefix="/api/admin/projects", tags=["Admin: Projects"])
app.include_router(admin_experiences.router, prefix="/api/admin/experiences", tags=["Admin: Experiences"])
app.include_router(admin_skills.router, prefix="/api/admin/skills", tags=["Admin: Skills"])
app.include_router(admin_education.router, prefix="/api/admin/education", tags=["Admin: Education"])
app.include_router(admin_contacts.router, prefix="/api/admin/contacts", tags=["Admin: Contacts"])