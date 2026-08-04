from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Portfolio Backend"
    DEBUG: bool = True
    FRONTEND_URL: str = "http://localhost:3000"
    
    # Database
    DATABASE_URL: str = "sqlite:///./portfolio.db"
    
    # JWT
    JWT_SECRET: str = "supersecretkey_change_in_production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    # Admin
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "admin123"
    
    # LLM & RAG (For Phase 8)
    LLM_PROVIDER: str = "mock"
    CHROMA_DIR: str = "./vector_store" # We will adapt this for LanceDB later
    EMBEDDING_MODEL: str = "BAAI/bge-small-en-v1.5" # FastEmbed default

    class Config:
        env_file = ".env"

settings = Settings()