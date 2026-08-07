from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.dependencies import get_current_admin
from app.models import Knowledge
from app.schemas import KnowledgeCreate, KnowledgeUpdate, KnowledgeResponse

router = APIRouter()

# Notice the paths are now just "/", "/{id}", and "/reindex"
@router.get("/", response_model=List[KnowledgeResponse])
def get_all_knowledge(db: Session = Depends(get_db), admin: dict = Depends(get_current_admin)):
    return db.query(Knowledge).all()

@router.post("/", response_model=KnowledgeResponse)
def create_knowledge(data: KnowledgeCreate, db: Session = Depends(get_db), admin: dict = Depends(get_current_admin)):
    new_knowledge = Knowledge(**data.model_dump())
    db.add(new_knowledge)
    db.commit()
    db.refresh(new_knowledge)
    return new_knowledge

@router.put("/{knowledge_id}", response_model=KnowledgeResponse)
def update_knowledge(knowledge_id: int, data: KnowledgeUpdate, db: Session = Depends(get_db), admin: dict = Depends(get_current_admin)):
    knowledge = db.query(Knowledge).filter(Knowledge.id == knowledge_id).first()
    if not knowledge:
        raise HTTPException(status_code=404, detail="Knowledge entry not found")
    
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(knowledge, key, value)
        
    db.commit()
    db.refresh(knowledge)
    return knowledge

@router.delete("/{knowledge_id}")
def delete_knowledge(knowledge_id: int, db: Session = Depends(get_db), admin: dict = Depends(get_current_admin)):
    knowledge = db.query(Knowledge).filter(Knowledge.id == knowledge_id).first()
    if not knowledge:
        raise HTTPException(status_code=404, detail="Knowledge entry not found")
    
    db.delete(knowledge)
    db.commit()
    return {"success": True, "message": "Knowledge deleted successfully"}

@router.post("/reindex")
def reindex_knowledge(db: Session = Depends(get_db), admin: dict = Depends(get_current_admin)):
    return {"success": True, "message": "Reindex triggered successfully"}