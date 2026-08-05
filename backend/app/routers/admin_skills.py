from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..core.dependencies import get_current_admin
from ..models import Skill, AdminUser
from ..schemas import SkillCreate, SkillUpdate, SkillResponse

router = APIRouter()

@router.get("/", response_model=List[SkillResponse])
def get_all_skills(db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    return db.query(Skill).order_by(Skill.sort_order).all()

@router.post("/", response_model=SkillResponse)
def create_skill(skill_data: SkillCreate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_skill = Skill(**skill_data.dict())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.put("/{skill_id}", response_model=SkillResponse)
def update_skill(skill_id: int, skill_data: SkillUpdate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    for key, value in skill_data.dict(exclude_unset=True).items():
        setattr(db_skill, key, value)
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.delete("/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(db_skill)
    db.commit()
    return {"success": True, "message": "Skill deleted"}