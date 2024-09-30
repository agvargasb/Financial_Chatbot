import requests
import os

from qdrant_client import QdrantClient
from langchain_community.vectorstores import Qdrant
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.retrievers.self_query.base import SelfQueryRetriever
from langchain import hub
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.runnables import RunnableParallel

from settings import (QDRANT_URL,
                      QDRANT_COLLECTION,
                      QDRANT_API_KEY,
                      GOOGLE_API_KEY,
                      Model_name,
                      Model_kwargs,
                      Encode_kwargs)

from data_info import (Metadata_field_info,
                       Document_content_description)


embeddings = HuggingFaceBgeEmbeddings(
    model_name=Model_name,
    model_kwargs=Model_kwargs,
    encode_kwargs=Encode_kwargs,
)

qdrant_client = QdrantClient(url=QDRANT_URL,
                             api_key=QDRANT_API_KEY)

qdrant_db = Qdrant(
    client=qdrant_client,
    collection_name=QDRANT_COLLECTION,
    embeddings=embeddings
)

gemini = ChatGoogleGenerativeAI(model="gemini-pro",
                                google_api_key=GOOGLE_API_KEY,
                                temperature=0.3,
                                convert_system_message_to_human=True)

retriever = SelfQueryRetriever.from_llm(
    gemini,
    qdrant_db,
    Document_content_description,
    Metadata_field_info,
    verbose=True,
    enable_limit=True
)

prompt = hub.pull("rlm/rag-prompt")

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

rag_chain_from_docs = (
    RunnablePassthrough.assign(context=(lambda x: format_docs(x["context"])))
    | prompt
    | gemini
    | StrOutputParser()
)

rag_chain_with_source = RunnableParallel(
    {"context": retriever,
     "question": RunnablePassthrough()}
).assign(answer=rag_chain_from_docs)


def get_answer(query):
    info = rag_chain_with_source.invoke(query)
    answer = info["answer"]
    contexts = []

    for doc in info["context"]:
        context_str = f"{doc.metadata['html_url']}\n\npage {doc.metadata['page_number']}."
        contexts.append(context_str)
    
    contexts = list(dict.fromkeys(contexts))
    context = "\n" + "\n\n\n".join(contexts)  
 
    return answer, context
