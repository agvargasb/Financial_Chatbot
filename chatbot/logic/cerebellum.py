import json
import time
import os

from langchain.vectorstores import Qdrant
from langchain.embeddings import HuggingFaceBgeEmbeddings
from qdrant_client import QdrantClient

import redis
import settings

import google.generativeai as genai
from brain import get_answer


db = redis.Redis(host=settings.REDIS_IP,
                 port=settings.REDIS_PORT,
                 db=settings.REDIS_DB_ID,
                 decode_responses=True)


genai.configure(api_key=settings.GOOGLE_API_KEY)


model = genai.GenerativeModel(model_name = "gemini-pro",
                              generation_config=settings.Generation_config,
                              safety_settings=settings.Safety_settings)
chat = model.start_chat(history=[])
chat.send_message(settings.Gemini_prompt)


def get_answer_with_history(query):
    """
    Get the answer to a query along with the chat history.

    Args:
        query (str): The query to send to the chat.

    Returns:
        str: The response text from the chat.
    """
    response = chat.send_message(query)
    return response.text


def classify_process():
    """
    Executes a continuous process to classify and process messages from a Redis queue.
    
    This function continuously listens for messages in a Redis queue and processes them accordingly.
    It retrieves a message from the queue using the `rpop` command from the `db` object.
    If a message is retrieved, it checks if the message is for the "Gemini" universe.
    If so, it calls the `get_answer_with_history` function to get an answer for the provided query,
    and sets the context to "Gemini". Otherwise, it calls the `get_answer` function to get an answer
    for the query, along with the context. The answer and context are then serialized into a JSON string
    and stored in the `results` variable.
    
    Finally, the results are stored in the Redis database using the `set` command,
    with the job id as the key. The process then sleeps for a specified amount of
    time as defined by the `SERVER_SLEEP` constant in the `settings` module.
    """
    
    while True:
        message = db.rpop(settings.REDIS_QUEUE)
        # message = message.decode("utf-8")
        
        if message is not None:
            message_json = json.loads(message)
            
            job_id = message_json["id"]
            query = message_json["query"]
            ask_universe = message_json.get("ask_universe")

            if ask_universe == "Gemini":
                answer = get_answer_with_history(query)
                context = "Gemini"
            else:
                answer, context = get_answer(query)
            
            results = json.dumps({"answer": answer,
                                  "context": context})

            
            db.set(job_id, results)

        # Sleep for a bit
        time.sleep(settings.SERVER_SLEEP)


if __name__ == "__main__":
    # Now launch process
    print("Cerebellum waking up...")
    classify_process()
