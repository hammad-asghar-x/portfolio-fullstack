from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..core.dependencies import get_current_admin
from ..models import ContactMessage, AdminUser
from ..schemas import ContactMessageResponse

router = APIRouter()

@router.get("/", response_model=List[ContactMessageResponse])
def get_all_messages(db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    """Get all contact messages, newest first."""
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()

@router.delete("/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_msg = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not db_msg:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(db_msg)
    db.commit()
    return {"success": True, "message": "Message deleted"}