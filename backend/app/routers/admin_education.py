from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..core.dependencies import get_current_admin
from ..models import Education, AdminUser
from ..schemas import EducationCreate, EducationUpdate, EducationResponse

router = APIRouter()

@router.get("/", response_model=List[EducationResponse])
def get_all_education(db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    return db.query(Education).order_by(Education.sort_order).all()

@router.post("/", response_model=EducationResponse)
def create_education(edu_data: EducationCreate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_edu = Education(**edu_data.dict())
    db.add(db_edu)
    db.commit()
    db.refresh(db_edu)
    return db_edu

@router.put("/{edu_id}", response_model=EducationResponse)
def update_education(edu_id: int, edu_data: EducationUpdate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_edu = db.query(Education).filter(Education.id == edu_id).first()
    if not db_edu:
        raise HTTPException(status_code=404, detail="Education not found")
    for key, value in edu_data.dict(exclude_unset=True).items():
        setattr(db_edu, key, value)
    db.commit()
    db.refresh(db_edu)
    return db_edu

@router.delete("/{edu_id}")
def delete_education(edu_id: int, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_edu = db.query(Education).filter(Education.id == edu_id).first()
    if not db_edu:
        raise HTTPException(status_code=404, detail="Education not found")
    db.delete(db_edu)
    db.commit()
    return {"success": True, "message": "Education deleted"}