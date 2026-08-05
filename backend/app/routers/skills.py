from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..models import Skill
from ..schemas import SkillResponse

router = APIRouter()

@router.get("/", response_model=List[SkillResponse])
def get_skills(db: Session = Depends(get_db)):
    """Get all published skills."""
    skills = db.query(Skill).filter(
        Skill.is_published == True
    ).order_by(Skill.sort_order).all()
    return skills