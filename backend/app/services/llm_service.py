from app.core.config import settings

def generate_llm_response(prompt: str, context: list[str]) -> str:
    provider = settings.LLM_PROVIDER.lower()
    
    if provider == "mock":
        return mock_response(prompt, context)
    elif provider == "groq":
        return groq_response(prompt, context)
    elif provider == "gemini":
        return gemini_response(prompt, context)
    elif provider == "ollama":
        return ollama_response(prompt, context)
    else:
        return "I am currently in maintenance mode. Please try again later."

def mock_response(prompt: str, context: list[str]) -> str:
    """Simple mock response for local testing without API keys."""
    if not context:
        return "I don't have enough information in my knowledge base to answer that specific question. Could you ask something about my projects, skills, or experience?"
    
    return f"Based on my portfolio data: {context[0]}"

def groq_response(prompt: str, context: list[str]) -> str:
    # Lazy import: only loads if this function is called
    try:
        from groq import Groq
    except ImportError:
        return "Groq package not installed. Please run: pip install groq"
        
    if not settings.GROQ_API_KEY:
        return "Error: Groq API key is missing in the backend .env file."

    try:
        client = Groq(api_key=settings.GROQ_API_KEY)
        context_text = "\n\n".join(context) if context else "No context provided."
        
        full_prompt = f"""You are a professional portfolio assistant for Hammad Asghar. 
Answer the user's question using ONLY the provided context below. 
If the answer is not in the context, politely say you don't have that information.
Be concise, polite, and professional.

Context:
{context_text}

User question: {prompt}
Answer:"""

        # UPDATED MODEL to currently supported one
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": full_prompt}],
            model="llama-3.1-8b-instant",  # Changed from llama3-8b-8192
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Groq API Error: {e}")
        return "I am having trouble connecting to my AI brain right now. Please try again in a moment."    # Lazy import: prevents Windows Application Control from blocking grpc on startup

def gemini_response(prompt: str, context: list[str]) -> str:
    # Lazy import: prevents Windows Application Control from blocking grpc on startup
    try:
        from google import genai
    except ImportError:
        return "Google GenAI package not installed. Please run: pip install google-genai"
        
    if not settings.GEMINI_API_KEY:
        return "Error: Gemini API key is missing in the backend .env file."

    try:
        client = genai.Client(api_key=settings.GEMINI_API_KEY)
        context_text = "\n\n".join(context) if context else "No context provided."
        
        full_prompt = f"""You are a professional portfolio assistant for Hammad Asghar. 
Answer the user's question using ONLY the provided context below. 
If the answer is not in the context, politely say you don't have that information.
Be concise, polite, and professional.

Context:
{context_text}

User question: {prompt}
Answer:"""

        # CHANGED to gemini-2.0-flash (which is in your available models list)
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=full_prompt
        )
        return response.text
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return "I am having trouble connecting to my AI brain right now. Please try again in a moment." 

def ollama_response(prompt: str, context: list[str]) -> str:
    return "Ollama integration pending local setup."