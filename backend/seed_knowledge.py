import sys
import os

# Add the backend folder to the system path so Python can find the 'app' module
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# CORRECTED IMPORT PATH
from app.core.database import SessionLocal, engine, Base
from app.models import Knowledge 

# Realistic dummy data based on our chat
DUMMY_KNOWLEDGE = [
    {
        "title": "Who is Hammad Asghar?",
        "content": "Hammad Asghar is a Full Stack Developer and Web Developer based in Islamabad, Pakistan. He specializes in building fast, accessible interfaces and full-stack applications.",
        "category": "General",
        "is_published": True
    },
    {
        "title": "What are Hammad's skills?",
        "content": "Hammad is highly skilled in Frontend development using Next.js, React, TypeScript, and Tailwind CSS. For Backend, he uses Python, FastAPI, and PostgreSQL. He also has experience with AI tools like RAG, LanceDB, and FastEmbed.",
        "category": "Skills",
        "is_published": True
    },
    {
        "title": "What projects has Hammad built?",
        "content": "Hammad built a Personal Portfolio Website using Next.js and FastAPI. It features a custom Admin Portal for content management and a RAG-based AI Chatbot that answers questions about his portfolio.",
        "category": "Projects",
        "is_published": True
    },
    {
        "title": "How to contact Hammad?",
        "content": "You can contact Hammad Asghar via email at hammad.asghar.x@gmail.com. He is currently open to work and interested in internships and software development roles.",
        "category": "Contact",
        "is_published": True
    },
    {
        "title": "What is Hammad's education?",
        "content": "Hammad has a strong background in Computer Science and Software Development, focusing on modern web technologies and AI integration.",
        "category": "Education",
        "is_published": True
    }
]

def seed_knowledge():
    print("Starting knowledge seeding...")
    
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if data already exists to avoid duplicates
        existing_count = db.query(Knowledge).count()
        if existing_count > 0:
            print(f"Database already has {existing_count} knowledge entries. Skipping seed.")
            return

        for item in DUMMY_KNOWLEDGE:
            new_entry = Knowledge(
                title=item["title"],
                content=item["content"],
                category=item["category"],
                is_published=item["is_published"]
            )
            db.add(new_entry)
            
        db.commit()
        print(f"✅ Successfully seeded {len(DUMMY_KNOWLEDGE)} knowledge entries into SQLite!")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding knowledge: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_knowledge()