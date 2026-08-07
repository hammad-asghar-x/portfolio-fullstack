from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.dependencies import get_current_admin
from app.models import ContactMessage
from app.schemas import ContactMessageResponse

router = APIRouter()

@router.get("/messages", response_model=List[ContactMessageResponse])
def get_all_messages(db: Session = Depends(get_db), admin: dict = Depends(get_current_admin)):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()

@router.delete("/messages/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db), admin: dict = Depends(get_current_admin)):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    db.delete(message)
    db.commit()
    return {"success": True, "message": "Message deleted successfully"}

@router.put("/messages/{message_id}/read", response_model=ContactMessageResponse)
def mark_message_as_read(message_id: int, db: Session = Depends(get_db), admin: dict = Depends(get_current_admin)):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    message.is_read = True
    db.commit()
    db.refresh(message)
    return message