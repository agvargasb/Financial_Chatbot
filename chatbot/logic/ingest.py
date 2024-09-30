from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Qdrant
# from langchain.embeddings import HuggingFaceBgeEmbeddings
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import DirectoryLoader, PyPDFLoader

def inject_data():

    url = "http://172.18.0.3:6333"

    # model_name = "BAAI/bge-large-en"
    model_name = "all-mpnet-base-v2"
    model_kwargs = {'device': 'cpu'}
    encode_kwargs = {'normalize_embeddings': False}

    embeddings = HuggingFaceEmbeddings(
        model_name=model_name,
        model_kwargs=model_kwargs,
        encode_kwargs=encode_kwargs
    )

    loader = DirectoryLoader(
        'data/',
        glob="**/*.pdf",
        show_progress=True,
        loader_cls=PyPDFLoader
    )

    documents = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100
    )

    texts = text_splitter.split_documents(documents)

    db = Qdrant.from_documents(
        texts,
        embeddings,
        url=url,
        prefer_grpc=False,
        collection_name="vector_db"
    )
