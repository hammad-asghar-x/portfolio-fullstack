from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# ============== ADMIN AUTH SCHEMAS ==============

class AdminLoginRequest(BaseModel):
    username: str
    password: str

class AdminLoginResponse(BaseModel):
    success: bool
    access_token: str
    token_type: str = "bearer"

# ============== PROJECT SCHEMAS ==============

class ProjectBase(BaseModel):
    title: str
    short_description: str
    long_description: str
    technologies: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    is_published: bool = True
    sort_order: int = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    short_description: Optional[str] = None
    long_description: Optional[str] = None
    technologies: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: Optional[bool] = None
    is_published: Optional[bool] = None
    sort_order: Optional[int] = None

class ProjectResponse(ProjectBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# ============== EXPERIENCE SCHEMAS ==============

class ExperienceBase(BaseModel):
    company: str
    role: str
    location: Optional[str] = None
    start_date: str
    end_date: Optional[str] = None
    current: bool = False
    description: str
    technologies: Optional[str] = None
    is_published: bool = True
    sort_order: int = 0

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    current: Optional[bool] = None
    description: Optional[str] = None
    technologies: Optional[str] = None
    is_published: Optional[bool] = None
    sort_order: Optional[int] = None

class ExperienceResponse(ExperienceBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# ============== SKILL SCHEMAS ==============

class SkillBase(BaseModel):
    name: str
    category: str
    level: Optional[str] = None
    is_published: bool = True
    sort_order: int = 0

class SkillCreate(SkillBase):
    pass

class SkillUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    level: Optional[str] = None
    is_published: Optional[bool] = None
    sort_order: Optional[int] = None

class SkillResponse(SkillBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# ============== EDUCATION SCHEMAS ==============

class EducationBase(BaseModel):
    institution: str
    degree: str
    field_of_study: Optional[str] = None
    start_date: str
    end_date: Optional[str] = None
    description: Optional[str] = None
    is_published: bool = True
    sort_order: int = 0

class EducationCreate(EducationBase):
    pass

class EducationUpdate(BaseModel):
    institution: Optional[str] = None
    degree: Optional[str] = None
    field_of_study: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None
    is_published: Optional[bool] = None
    sort_order: Optional[int] = None

class EducationResponse(EducationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# ============== CONTACT MESSAGE SCHEMAS ==============

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)

class ContactMessageResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: datetime
    is_read: bool

    class Config:
        from_attributes = True

# ============== GENERIC RESPONSE WRAPPER ==============

class SuccessResponse(BaseModel):
    success: bool = True
    data: Optional[dict] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str

class ListResponse(BaseModel):
    success: bool = True
    data: List
    total: int