import lancedb
# FIX: Import 'settings' directly instead of 'get_settings'
from app.core.config import settings 
from app.services.embedding_service import get_embeddings

# Use CHROMA_DIR if it exists in your config, otherwise fallback to "./vector_store"
vector_store_path = getattr(settings, 'CHROMA_DIR', './vector_store')

# Connect to LanceDB (creates the directory if it doesn't exist)
db = lancedb.connect(vector_store_path)

def get_knowledge_table():
    table_name = "portfolio_knowledge"
    
    # Check if table exists, if not create it with the correct schema
    if table_name not in db.table_names():
        # Create table with initial dummy data to establish schema, then delete it
        init_data = [{
            "id": "init", 
            "text": "init", 
            "vector": get_embeddings(["init"])[0],
            "metadata": "{}"
        }]
        db.create_table(table_name, data=init_data)
        # Delete the init row immediately
        db.open_table(table_name).delete('id = "init"')
        
    return db.open_table(table_name)

def add_to_vector_store(id: str, text: str, metadata: dict = None):
    table = get_knowledge_table()
    vector = get_embeddings([text])[0]
    
    # Upsert (insert or update) the data
    table.add([{
        "id": str(id),
        "text": text,
        "vector": vector,
        "metadata": str(metadata or {}) # LanceDB requires simple types, so we stringify dict
    }])

def delete_from_vector_store(id: str):
    table = get_knowledge_table()
    table.delete(f'id = "{id}"')

def query_vector_store(query_text: str, top_k: int = 5) -> list[str]:
    table = get_knowledge_table()
    query_vector = get_embeddings([query_text])[0]
    
    # Search the table
    results = table.search(query_vector).limit(top_k).to_list()
    
    # Extract just the text chunks
    return [row['text'] for row in results]