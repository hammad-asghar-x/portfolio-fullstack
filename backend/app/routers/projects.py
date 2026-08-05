from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..core.database import get_db
from ..models import Project
from ..schemas import ProjectResponse

router = APIRouter()

@router.get("/", response_model=List[ProjectResponse])
def get_projects(
    featured: Optional[bool] = None,
    limit: int = Query(default=10, le=50),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db)
):
    """Get all published projects, optionally filtered by featured status."""
    query = db.query(Project).filter(Project.is_published == True)
    
    if featured is not None:
        query = query.filter(Project.featured == featured)
        
    projects = query.order_by(Project.sort_order).offset(offset).limit(limit).all()
    return projects

@router.get("/{slug}", response_model=ProjectResponse)
def get_project_by_slug(slug: str, db: Session = Depends(get_db)):
    """Get a single published project by its slug."""
    project = db.query(Project).filter(
        Project.slug == slug, 
        Project.is_published == True
    ).first()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project