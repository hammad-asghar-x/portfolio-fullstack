from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models import ContactMessage
from ..schemas import ContactMessageCreate, SuccessResponse

router = APIRouter()

@router.post("/", response_model=SuccessResponse)
def send_contact_message(
    message_data: ContactMessageCreate, 
    db: Session = Depends(get_db)
):
    """Save a contact form message to the database."""
    # Limit message length just in case
    if len(message_data.message) > 2000:
        raise HTTPException(status_code=400, detail="Message is too long")

    db_message = ContactMessage(
        name=message_data.name,
        email=message_data.email,
        message=message_data.message
    )
    
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    return {"success": True, "data": {"id": db_message.id, "message": "Message sent successfully"}}