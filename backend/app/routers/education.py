from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..models import Education
from ..schemas import EducationResponse

router = APIRouter()

@router.get("/", response_model=List[EducationResponse])
def get_education(db: Session = Depends(get_db)):
    """Get all published education entries."""
    education = db.query(Education).filter(
        Education.is_published == True
    ).order_by(Education.sort_order).all()
    return education