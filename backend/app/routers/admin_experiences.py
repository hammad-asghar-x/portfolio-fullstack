from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..core.dependencies import get_current_admin
from ..models import Experience, AdminUser
from ..schemas import ExperienceCreate, ExperienceUpdate, ExperienceResponse

router = APIRouter()

@router.get("/", response_model=List[ExperienceResponse])
def get_all_experiences(db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    return db.query(Experience).order_by(Experience.sort_order).all()

@router.post("/", response_model=ExperienceResponse, status_code=status.HTTP_201_CREATED)
def create_experience(exp_data: ExperienceCreate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_exp = Experience(**exp_data.dict())
    db.add(db_exp)
    db.commit()
    db.refresh(db_exp)
    return db_exp

@router.put("/{exp_id}", response_model=ExperienceResponse)
def update_experience(exp_id: int, exp_data: ExperienceUpdate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_exp = db.query(Experience).filter(Experience.id == exp_id).first()
    if not db_exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    for key, value in exp_data.dict(exclude_unset=True).items():
        setattr(db_exp, key, value)
        
    db.commit()
    db.refresh(db_exp)
    return db_exp

@router.delete("/{exp_id}")
def delete_experience(exp_id: int, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_exp = db.query(Experience).filter(Experience.id == exp_id).first()
    if not db_exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    db.delete(db_exp)
    db.commit()
    return {"success": True, "message": "Experience deleted"}