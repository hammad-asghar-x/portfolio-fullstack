"""
Seed script to populate database with initial data.
Run with: python seed.py
"""

from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.core.database import SessionLocal, engine, Base
from app.models import (
    AdminUser, Project, Experience, Skill, Education, 
    ContactMessage
)
from app.core.config import settings

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return pwd_context.hash(password)

def create_tables():
    """Create all database tables"""
    print(" Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully!")

def create_admin_user(db: Session):
    """Create default admin user"""
    print("\n👤 Creating admin user...")
    
    # Check if admin already exists
    existing_admin = db.query(AdminUser).filter(
        AdminUser.username == settings.ADMIN_USERNAME
    ).first()
    
    if existing_admin:
        print("⚠️  Admin user already exists!")
        return
    
    admin_user = AdminUser(
        username=settings.ADMIN_USERNAME,
        password_hash=hash_password(settings.ADMIN_PASSWORD)
    )
    
    db.add(admin_user)
    db.commit()
    print(f"✅ Admin user created: {settings.ADMIN_USERNAME}")
    print(f"   Password: {settings.ADMIN_PASSWORD}")
    print("   ⚠️  Change this password in production!")

def create_sample_projects(db: Session):
    """Create sample projects"""
    print("\n Creating sample projects...")
    
    projects = [
        {
            "title": "Personal Portfolio Website",
            "slug": "personal-portfolio-website",
            "short_description": "Full-stack portfolio with admin portal and AI chatbot",
            "long_description": """
                A modern, fast, and responsive personal portfolio website built with Next.js and FastAPI.
                Features include an admin portal for easy content management, a RAG-based AI chatbot
                that answers questions about my projects and skills, and optimized performance for
                excellent Core Web Vitals scores.
                
                The project demonstrates full-stack development skills, clean architecture,
                and attention to user experience and accessibility.
            """,
            "technologies": "Next.js, FastAPI, TypeScript, Tailwind CSS, SQLite, ChromaDB, RAG",
            "github_url": "https://github.com/yourusername/portfolio",
            "live_url": "https://yourportfolio.com",
            "image_url": "https://via.placeholder.com/800x600/0ea5e9/ffffff?text=Portfolio+Website",
            "featured": True,
            "is_published": True,
            "sort_order": 1
        },
        {
            "title": "Task Management API",
            "slug": "task-management-api",
            "short_description": "RESTful API for task management with authentication",
            "long_description": """
                A robust RESTful API built with FastAPI for managing tasks and projects.
                Features JWT authentication, role-based access control, CRUD operations,
                and comprehensive API documentation.
                
                The API follows RESTful principles and includes proper error handling,
                input validation, and database migrations.
            """,
            "technologies": "FastAPI, Python, SQLAlchemy, PostgreSQL, JWT, Pydantic",
            "github_url": "https://github.com/yourusername/task-api",
            "live_url": None,
            "image_url": "https://via.placeholder.com/800x600/10b981/ffffff?text=Task+API",
            "featured": False,
            "is_published": True,
            "sort_order": 2
        },
        {
            "title": "AI Chatbot with RAG",
            "slug": "ai-chatbot-rag",
            "short_description": "RAG-based chatbot for document question answering",
            "long_description": """
                An intelligent chatbot that answers questions based on provided documents
                using Retrieval-Augmented Generation (RAG) architecture.
                
                The system uses ChromaDB for vector storage, sentence-transformers for
                embeddings, and integrates with various LLM providers including Ollama,
                Gemini, and Groq.
            """,
            "technologies": "Python, ChromaDB, LangChain, FastAPI, sentence-transformers",
            "github_url": "https://github.com/yourusername/rag-chatbot",
            "live_url": None,
            "image_url": "https://via.placeholder.com/800x600/8b5cf6/ffffff?text=RAG+Chatbot",
            "featured": True,
            "is_published": True,
            "sort_order": 3
        }
    ]
    
    count = 0
    for project_data in projects:
        # Check if project already exists
        existing = db.query(Project).filter(
            Project.slug == project_data["slug"]
        ).first()
        
        if not existing:
            project = Project(**project_data)
            db.add(project)
            count += 1
    
    db.commit()
    print(f"✅ Created {count} sample projects")

def create_sample_experience(db: Session):
    """Create sample work experience"""
    print("\n💼 Creating sample experience...")
    
    experiences = [
        {
            "company": "Tech Startup Inc.",
            "role": "Full Stack Developer",
            "location": "Remote",
            "start_date": "2024-01",
            "end_date": None,
            "current": True,
            "description": """
                Leading frontend development for a SaaS product using Next.js and TypeScript.
                Built reusable component libraries, implemented CI/CD pipelines, and
                improved application performance by 40%.
                
                Collaborating with design and backend teams to deliver high-quality features
                on tight deadlines.
            """,
            "technologies": "Next.js, TypeScript, React, Tailwind CSS, FastAPI",
            "is_published": True,
            "sort_order": 1
        },
        {
            "company": "Digital Agency Co.",
            "role": "Junior Developer",
            "location": "New York, NY",
            "start_date": "2022-06",
            "end_date": "2023-12",
            "current": False,
            "description": """
                Developed responsive websites and web applications for clients across
                various industries. Worked with React, Node.js, and modern CSS frameworks.
                
                Gained experience in agile development, version control, and client communication.
            """,
            "technologies": "React, Node.js, MongoDB, Express, Git",
            "is_published": True,
            "sort_order": 2
        }
    ]
    
    count = 0
    for exp_data in experiences:
        existing = db.query(Experience).filter(
            Experience.company == exp_data["company"],
            Experience.role == exp_data["role"]
        ).first()
        
        if not existing:
            experience = Experience(**exp_data)
            db.add(experience)
            count += 1
    
    db.commit()
    print(f"✅ Created {count} sample experience entries")

def create_sample_skills(db: Session):
    """Create sample skills"""
    print("\n🛠️  Creating sample skills...")
    
    skills = [
        # Frontend
        {"name": "React", "category": "Frontend", "level": "Advanced", "sort_order": 1},
        {"name": "Next.js", "category": "Frontend", "level": "Advanced", "sort_order": 2},
        {"name": "TypeScript", "category": "Frontend", "level": "Advanced", "sort_order": 3},
        {"name": "Tailwind CSS", "category": "Frontend", "level": "Advanced", "sort_order": 4},
        {"name": "HTML/CSS", "category": "Frontend", "level": "Expert", "sort_order": 5},
        
        # Backend
        {"name": "Python", "category": "Backend", "level": "Advanced", "sort_order": 6},
        {"name": "FastAPI", "category": "Backend", "level": "Advanced", "sort_order": 7},
        {"name": "SQLAlchemy", "category": "Backend", "level": "Intermediate", "sort_order": 8},
        {"name": "PostgreSQL", "category": "Backend", "level": "Intermediate", "sort_order": 9},
        {"name": "REST APIs", "category": "Backend", "level": "Advanced", "sort_order": 10},
        
        # AI/ML
        {"name": "RAG Systems", "category": "AI/ML", "level": "Intermediate", "sort_order": 11},
        {"name": "LangChain", "category": "AI/ML", "level": "Intermediate", "sort_order": 12},
        {"name": "ChromaDB", "category": "AI/ML", "level": "Intermediate", "sort_order": 13},
        
        # Tools
        {"name": "Git", "category": "Tools", "level": "Advanced", "sort_order": 14},
        {"name": "Docker", "category": "Tools", "level": "Intermediate", "sort_order": 15},
        {"name": "CI/CD", "category": "Tools", "level": "Intermediate", "sort_order": 16},
    ]
    
    count = 0
    for skill_data in skills:
        existing = db.query(Skill).filter(
            Skill.name == skill_data["name"],
            Skill.category == skill_data["category"]
        ).first()
        
        if not existing:
            skill = Skill(**skill_data)
            db.add(skill)
            count += 1
    
    db.commit()
    print(f"✅ Created {count} sample skills")

def create_sample_education(db: Session):
    """Create sample education entries"""
    print("\n Creating sample education...")
    
    education_entries = [
        {
            "institution": "University of Technology",
            "degree": "Bachelor of Science",
            "field_of_study": "Computer Science",
            "start_date": "2019",
            "end_date": "2023",
            "description": """
                Focused on software engineering, algorithms, and database systems.
                Graduated with honors. Completed capstone project on machine learning
                applications in web development.
            """,
            "is_published": True,
            "sort_order": 1
        },
        {
            "institution": "Code Academy",
            "degree": "Full Stack Web Development Certificate",
            "field_of_study": "Web Development",
            "start_date": "2018",
            "end_date": "2019",
            "description": """
                Intensive bootcamp covering modern web development technologies including
                React, Node.js, databases, and deployment strategies.
            """,
            "is_published": True,
            "sort_order": 2
        }
    ]
    
    count = 0
    for edu_data in education_entries:
        existing = db.query(Education).filter(
            Education.institution == edu_data["institution"],
            Education.degree == edu_data["degree"]
        ).first()
        
        if not existing:
            education = Education(**edu_data)
            db.add(education)
            count += 1
    
    db.commit()
    print(f"✅ Created {count} sample education entries")

def main():
    """Main seed function"""
    print("\n" + "="*60)
    print(" STARTING DATABASE SEEDING")
    print("="*60)
    
    # Create tables
    create_tables()
    
    # Create database session
    db = SessionLocal()
    
    try:
        # Create admin user
        create_admin_user(db)
        
        # Create sample data
        create_sample_projects(db)
        create_sample_experience(db)
        create_sample_skills(db)
        create_sample_education(db)
        
        print("\n" + "="*60)
        print("✅ SEEDING COMPLETED SUCCESSFULLY!")
        print("="*60)
        print("\n📊 Summary:")
        print("   - Admin user created")
        print("   - Sample projects added")
        print("   - Sample experience added")
        print("   - Sample skills added")
        print("   - Sample education added")
        print("\n Admin Login:")
        print(f"   Username: {settings.ADMIN_USERNAME}")
        print(f"   Password: {settings.ADMIN_PASSWORD}")
        print("\n🌐 Next steps:")
        print("   1. Start the backend: uvicorn app.main:app --reload --port 8000")
        print("   2. Visit: http://localhost:8000/docs")
        print("   3. Test the API endpoints")
        print("="*60 + "\n")
        
    finally:
        db.close()

if __name__ == "__main__":
    main()