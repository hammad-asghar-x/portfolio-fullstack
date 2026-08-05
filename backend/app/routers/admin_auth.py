from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..core.security import verify_password, create_access_token
from ..core.config import settings
from ..models import AdminUser
from ..schemas import AdminLoginRequest, AdminLoginResponse

router = APIRouter()

@router.post("/login", response_model=AdminLoginResponse)
def admin_login(login_data: AdminLoginRequest, db: Session = Depends(get_db)):
    """Authenticate admin and return a JWT token."""
    
    # Find the admin user
    admin = db.query(AdminUser).filter(AdminUser.username == login_data.username).first()
    
    # Check if user exists and password is correct
    if not admin or not verify_password(login_data.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create the access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin.username}, 
        expires_delta=access_token_expires
    )
    
    return {
        "success": True,
        "access_token": access_token,
        "token_type": "bearer"
    }