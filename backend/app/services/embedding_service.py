from fastembed import TextEmbedding
from functools import lru_cache

@lru_cache()
def get_embedding_model():
    # FastEmbed automatically downloads and caches the ONNX model
    print("Loading FastEmbed model...")
    return TextEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")

def get_embeddings(texts: list[str]) -> list[list[float]]:
    model = get_embedding_model()
    # fastembed returns a generator, so we convert it to a list of lists
    return [embedding.tolist() for embedding in model.embed(texts)]
