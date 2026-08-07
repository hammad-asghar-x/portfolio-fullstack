import sys
import os

# Add the backend folder to the system path so Python can find the 'app' module
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# CORRECTED IMPORT PATHS
from app.core.database import SessionLocal, engine, Base
from app.models import Knowledge 
from app.services.vector_store_service import add_to_vector_store, get_knowledge_table

def ingest_knowledge():
    print("Starting knowledge ingestion into Vector Store...")
    
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Get all published knowledge entries
        entries = db.query(Knowledge).filter(Knowledge.is_published == True).all()
        print(f"Found {len(entries)} published knowledge entries in database.")
        
        # Clear existing data in LanceDB to avoid duplicates during reindex
        try:
            table = get_knowledge_table()
            for entry in entries:
                table.delete(f'id = "{entry.id}"')
            print("✅ Cleared old vector store data.")
        except Exception as e:
            print(f"Note: Could not clear old data (might be empty). Error: {e}")

        # Add to Vector Store
        count = 0
        for entry in entries:
            # We use the entry ID as the vector ID
            add_to_vector_store(
                id=str(entry.id),
                text=f"{entry.title}. {entry.content}", # Combine title and content for better context
                metadata={"category": entry.category}
            )
            count += 1
            
        print(f"✅ Successfully ingested {count} entries into LanceDB!")
        
    except Exception as e:
        print(f"❌ Error during ingestion: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    ingest_knowledge()