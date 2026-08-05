from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..models import Experience
from ..schemas import ExperienceResponse

router = APIRouter()

@router.get("/", response_model=List[ExperienceResponse])
def get_experiences(db: Session = Depends(get_db)):
    """Get all published experiences."""
    experiences = db.query(Experience).filter(
        Experience.is_published == True
    ).order_by(Experience.sort_order).all()
    return experiences