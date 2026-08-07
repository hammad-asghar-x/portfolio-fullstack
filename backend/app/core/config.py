from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # 1. env_file=".env" reads your .env file
    # 2. extra="ignore" prevents crashes if you add new variables later
    # 3. case_sensitive=False ensures GEMINI_API_KEY matches gemini_api_key
    model_config = SettingsConfigDict(
        env_file=".env", 
        extra="ignore",
        case_sensitive=False
    )
    
    APP_NAME: str = "Portfolio Backend"
    DEBUG: bool = True
    FRONTEND_URLS: str = "http://localhost:3000,https://your-frontend.vercel.app"
    
    # Database
    DATABASE_URL: str = "sqlite:///./portfolio.db"
    
    # JWT
    JWT_SECRET: str = "supersecretkey_change_in_production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    # Admin
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "admin123"
    
    # Chatbot / RAG Configuration
    LLM_PROVIDER: str = "mock"
    GEMINI_API_KEY: str = ""
    GROQ_API_KEY: str = ""
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3"
    CHROMA_DIR: str = "./vector_store"
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"

# Create the global settings instance
settings = Settings()