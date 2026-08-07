from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid

from app.services.vector_store_service import query_vector_store
from app.services.llm_service import generate_llm_response

router = APIRouter(prefix="/api", tags=["Chat"])

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: datetime

class ChatResponse(BaseModel):
    success: bool
    answer: str
    session_id: str
    sources: Optional[List[str]] = None

@router.post("/chat", response_model=ChatResponse)
async def chat_with_portfolio(request: ChatRequest):
    """
    Chat with the portfolio AI assistant.
    
    The chatbot answers questions about the portfolio owner using RAG (Retrieval-Augmented Generation).
    It retrieves relevant information from the knowledge base and generates responses.
    """
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    if len(request.message) > 1000:
        raise HTTPException(status_code=400, detail="Message is too long (max 1000 characters)")
    
    # Generate or use existing session ID
    session_id = request.session_id or str(uuid.uuid4())
    
    try:
        # Step 1: Retrieve relevant context from vector store
        # Get top 3 most relevant knowledge chunks
        context_chunks = query_vector_store(request.message, top_k=3)
        
        # Step 2: Generate response using LLM
        answer = generate_llm_response(request.message, context_chunks)
        
        # Step 3: Return response with sources
        return ChatResponse(
            success=True,
            answer=answer,
            session_id=session_id,
            sources=context_chunks if context_chunks else None
        )
        
    except Exception as e:
        print(f"Chat error: {e}")
        raise HTTPException(
            status_code=500, 
            detail="Sorry, I'm having trouble responding right now. Please try again later."
        )

@router.get("/chat/health")
async def chat_health():
    """Check if chat service is available"""
    return {
        "status": "ok",
        "service": "chat",
        "message": "Chat service is running"
    }