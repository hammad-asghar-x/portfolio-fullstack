from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer  # Change this line
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from .config import settings
from .database import get_db
from ..models import AdminUser

# Change this line from OAuth2PasswordBearer to HTTPBearer
security = HTTPBearer()

def get_current_admin(
    token: str = Depends(security),  # Update this line
    db: Session = Depends(get_db)
) -> AdminUser:
    """Dependency to get the current logged-in admin user."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Extract the token from the HTTPBearer object
        token_value = token.credentials
        # Decode the JWT token
        payload = jwt.decode(token_value, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # Find the user in the database
    user = db.query(AdminUser).filter(AdminUser.username == username).first()
    if user is None:
        raise credentials_exception
        
    return user