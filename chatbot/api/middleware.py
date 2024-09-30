import json
import time
from uuid import uuid4

import redis
import settings


db = redis.Redis(host=settings.REDIS_IP,
                 port=settings.REDIS_PORT,
                 db=settings.REDIS_DB_ID,
                 decode_responses=True)


def send_to_cerebellum(query, ask_universe):
    """
    Sends a query to the cerebellum for processing and waits for the response.

    Parameters:
    - query (str): The query to send to the cerebellum.
    - ask_universe (bool): Flag indicating whether to ask the universe or not.

    Returns:
    - output (str): The response received from the cerebellum.
    """
    
    job_id = str(uuid4())

    if ask_universe == False:
        job_data = {"id": job_id, "query": query}
    else:
        job_data = {"id": job_id, "query": query, "ask_universe": "Gemini"}

    # Send the job to the logic service using Redis
    db.lpush(settings.REDIS_QUEUE, json.dumps(job_data))

    # Loop until we received the response from logic/cerebellum.py
    while True:
        # Attempt to get the response using job_id.
        output = db.get(job_id)

        # Check if the response was received.
        if output is not None:
            # output = json.loads(output)
            db.delete(job_id)
            break

        # Sleep some time waiting for the response.
        time.sleep(settings.API_SLEEP)

    return output
