from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..core.dependencies import get_current_admin
from ..models import Project, AdminUser
from ..schemas import ProjectCreate, ProjectUpdate, ProjectResponse

router = APIRouter()

def generate_slug(title: str) -> str:
    return title.lower().replace(" ", "-").replace("'", "")

@router.get("/", response_model=List[ProjectResponse])
def get_all_projects(db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    """Get all projects (including unpublished) for admin management."""
    return db.query(Project).order_by(Project.sort_order).all()

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project_data: ProjectCreate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    """Create a new project."""
    slug = generate_slug(project_data.title)
    # Check if slug exists
    if db.query(Project).filter(Project.slug == slug).first():
        slug = f"{slug}-{db.query(Project).count() + 1}"
        
    db_project = Project(**project_data.dict(), slug=slug)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, project_data: ProjectUpdate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    """Update an existing project."""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    for key, value in project_data.dict(exclude_unset=True).items():
        setattr(db_project, key, value)
        
    db.commit()
    db.refresh(db_project)
    return db_project

@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    """Delete a project."""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(db_project)
    db.commit()
    return {"success": True, "message": "Project deleted"}