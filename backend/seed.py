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
    return pwd_context.hash(password)

def create_tables():
    print(" Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully!")

def create_admin_user(db: Session):
    print("\n👤 Creating admin user...")
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

def create_sample_projects(db: Session):
    print("\n🚀 Creating real projects...")
    
    projects = [
        {
            "title": "GMS Pro - Garage Management System",
            "slug": "gms-pro-garage-management",
            "short_description": "Enterprise-grade web app to digitize automotive garage operations.",
            "long_description": """
                GMS Pro is a comprehensive, multi-role digital workflow platform connecting customers, 
                technicians, managers, and accountants. It replaces manual paperwork with a seamless 
                digital experience, featuring automated invoicing, real-time inventory management, 
                and secure staff onboarding. Built with a focus on scalability and user experience.
            """,
            "technologies": "Next.js, TypeScript, Supabase, Tailwind CSS, PostgreSQL",
            "github_url": "https://github.com/hammad-asghar-x/garage-management-system",
            "live_url": None,
            "image_url": "https://via.placeholder.com/800x600/1e293b/ffffff?text=GMS+Pro",
            "featured": True,
            "is_published": True,
            "sort_order": 1
        },
        {
            "title": "Personal Budget & Expense Tracker",
            "slug": "personal-budget-expense-tracker",
            "short_description": "Full-stack Laravel application for personal finance management.",
            "long_description": """
                A robust personal finance application built with Laravel and PHP. Features include 
                secure authentication, dynamic dashboard analytics, AI-driven budget recommendations, 
                and comprehensive expense tracking. The backend utilizes Livewire for reactive UI 
                components and SQLite for lightweight, efficient data storage.
            """,
            "technologies": "Laravel, PHP, Livewire, SQLite, Vite, Tailwind CSS",
            "github_url": "https://github.com/hammad-asghar-x/Personal-Budget-Expense-Tracking-Web-Application",
            "live_url": None,
            "image_url": "https://via.placeholder.com/800x600/10b981/ffffff?text=Budget+Tracker",
            "featured": False,
            "is_published": True,
            "sort_order": 2
        },
        {
            "title": "Enterprise Inventory Management System",
            "slug": "java-spring-boot-inventory",
            "short_description": "Backend-heavy inventory system built with Java and Spring Boot.",
            "long_description": """
                A pure Java enterprise application designed to manage complex inventory workflows. 
                Built using the Spring Boot framework, it features RESTful API endpoints, 
                Hibernate ORM for database mapping, and secure authentication. 
                Focuses on clean architecture, dependency injection, and scalable backend logic.
            """,
            "technologies": "Java, Spring Boot, Hibernate, Maven, REST APIs",
            "github_url": "#",
            "live_url": None,
            "image_url": "https://via.placeholder.com/800x600/f59e0b/ffffff?text=Java+Spring+Boot",
            "featured": False,
            "is_published": True,
            "sort_order": 3
        },
        {
            "title": "Personal Portfolio & AI Chatbot",
            "slug": "personal-portfolio-website",
            "short_description": "Full-stack portfolio with admin portal and RAG-based AI chatbot.",
            "long_description": """
                A modern, fast, and responsive personal portfolio website built with Next.js and FastAPI.
                Features include a custom admin portal for easy content management and a RAG-based AI 
                chatbot that answers questions about my projects and skills using vector embeddings.
            """,
            "technologies": "Next.js, FastAPI, TypeScript, Tailwind CSS, RAG, ChromaDB",
            "github_url": "https://github.com/hammad-asghar-x/portfolio-fullstack",
            "live_url": None,
            "image_url": "https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Portfolio+Website",
            "featured": True,
            "is_published": True,
            "sort_order": 4
        }
    ]
    
    count = 0
    for project_data in projects:
        existing = db.query(Project).filter(Project.slug == project_data["slug"]).first()
        if not existing:
            project = Project(**project_data)
            db.add(project)
            count += 1
    db.commit()
    print(f"✅ Created {count} real projects")

def create_sample_experience(db: Session):
    print("\n💼 Creating real experience...")
    
    experiences = [
        {
            "company": "Rendlen Solutions",
            "role": "Full Stack Web Developer Intern",
            "location": "Remote / Islamabad",
            "start_date": "2024-01",
            "end_date": None,
            "current": True,
            "description": """
                Currently working as a Full Stack Web Developer Intern. Building and maintaining 
                responsive web applications using modern frameworks. Collaborating with senior 
                developers to implement clean architecture, optimize performance, and deliver 
                high-quality features for client projects.
            """,
            "technologies": "Next.js, React, FastAPI, Python, TypeScript",
            "is_published": True,
            "sort_order": 1
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
    print(f"✅ Created {count} experience entries")

def create_sample_skills(db: Session):
    print("\n️  Creating real skills...")
    
    skills = [
        # Frontend
        {"name": "Next.js", "category": "Frontend", "level": "Advanced", "sort_order": 1},
        {"name": "React", "category": "Frontend", "level": "Advanced", "sort_order": 2},
        {"name": "TypeScript", "category": "Frontend", "level": "Advanced", "sort_order": 3},
        {"name": "Tailwind CSS", "category": "Frontend", "level": "Advanced", "sort_order": 4},
        {"name": "HTML/CSS", "category": "Frontend", "level": "Expert", "sort_order": 5},
        
        # Backend
        {"name": "Python", "category": "Backend", "level": "Advanced", "sort_order": 6},
        {"name": "FastAPI", "category": "Backend", "level": "Advanced", "sort_order": 7},
        {"name": "Laravel", "category": "Backend", "level": "Intermediate", "sort_order": 8},
        {"name": "PHP", "category": "Backend", "level": "Intermediate", "sort_order": 9},
        {"name": "Java", "category": "Backend", "level": "Intermediate", "sort_order": 10},
        {"name": "Spring Boot", "category": "Backend", "level": "Intermediate", "sort_order": 11},
        {"name": "REST APIs", "category": "Backend", "level": "Advanced", "sort_order": 12},
        
        # Database
        {"name": "PostgreSQL", "category": "Database", "level": "Intermediate", "sort_order": 13},
        {"name": "Supabase", "category": "Database", "level": "Intermediate", "sort_order": 14},
        {"name": "SQLite", "category": "Database", "level": "Advanced", "sort_order": 15},
        
        # Tools
        {"name": "Git & GitHub", "category": "Tools", "level": "Advanced", "sort_order": 16},
        {"name": "VS Code", "category": "Tools", "level": "Expert", "sort_order": 17},
        {"name": "Linux", "category": "Tools", "level": "Intermediate", "sort_order": 18},
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
    print(f"✅ Created {count} real skills")

def create_sample_education(db: Session):
    print("\n🎓 Creating real education...")
    
    education_entries = [
        {
            "institution": "Capital University of Science and Technology (CUST)",
            "degree": "Bachelor of Science (BS)",
            "field_of_study": "Software Engineering",
            "start_date": "2021",
            "end_date": "2025",
            "description": """
                Maintained a strong academic record with a CGPA of 3.76. Focused on core software 
                engineering principles, full-stack development, and scalable system design. 
                Key coursework includes Data Structures, Algorithms, Database Systems, and Software Architecture.
            """,
            "is_published": True,
            "sort_order": 1
        },
        {
            "institution": "Punjab Group of Colleges (PGC)",
            "degree": "Intermediate",
            "field_of_study": "Computer Science (ICS)",
            "start_date": "2019",
            "end_date": "2021",
            "description": """
                Completed Intermediate in Computer Science (ICS) with a B+ grade. 
                Built a strong foundational understanding of programming logic, mathematics, 
                and computer science fundamentals.
            """,
            "is_published": True,
            "sort_order": 2
        },
        {
            "institution": "MPS",
            "degree": "Matriculation",
            "field_of_study": "Science",
            "start_date": "2017",
            "end_date": "2019",
            "description": """
                Completed Matriculation in Science with an A+ grade. 
                Developed early analytical skills and a strong interest in technology and problem-solving.
            """,
            "is_published": True,
            "sort_order": 3
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
    print(f"✅ Created {count} education entries")

def main():
    print("\n" + "="*60)
    print("🌱 STARTING DATABASE SEEDING")
    print("="*60)
    
    create_tables()
    db = SessionLocal()
    
    try:
        create_admin_user(db)
        create_sample_projects(db)
        create_sample_experience(db)
        create_sample_skills(db)
        create_sample_education(db)
        
        print("\n" + "="*60)
        print("✅ SEEDING COMPLETED SUCCESSFULLY!")
        print("="*60 + "\n")
        
    finally:
        db.close()

if __name__ == "__main__":
    main()