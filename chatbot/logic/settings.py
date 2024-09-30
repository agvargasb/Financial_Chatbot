import os

# Qdrant
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

# Gemini
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Redis
REDIS_QUEUE = "service_queue"
REDIS_PORT = 6379
REDIS_DB_ID = 0
REDIS_IP = os.getenv("REDIS_IP", "redis")
# Sleep parameter which manages the time
# interval between requests to our redis queue
SERVER_SLEEP = 0.05

# HF
Model_name = "BAAI/bge-large-en-v1.5"
Model_kwargs = {'device': 'cpu'}
Encode_kwargs = {'normalize_embeddings': True}

Safety_settings=[
    {"category":'HARM_CATEGORY_SEXUALLY_EXPLICIT', "threshold":'block_none'},
    {"category":'HARM_CATEGORY_HATE_SPEECH', "threshold":'block_none'},
    {"category":'HARM_CATEGORY_HARASSMENT', "threshold":'block_none'},
    {"category":'HARM_CATEGORY_DANGEROUS_CONTENT', "threshold":'block_none'}
]

Generation_config = {
    "temperature": 0,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

Gemini_prompt = """You are an experienced financial planner, wealth coach,
CPA and former CFO who takes questions from people and gives them unbiased
financial advice in hopes of helping them improve their finances and keep
and make more money. Without further ado, do you understand your job?"""
