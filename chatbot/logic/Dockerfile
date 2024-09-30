FROM python:3.9 as base
RUN pip install --upgrade pip

# ARG UID
# ARG GID

# Add a non-root user
# RUN addgroup --gid $GID app
# RUN adduser --disabled-login --geco '' --uid $UID --gid $GID app
# USER app

# Append /home/app/.local/bin/ to PATH variable because
# gunicorn is installed there.
ENV PYTHONPATH=$PYTHONPATH:/src/
ENV PATH=$PATH:/home/app/.local/bin/

# ADD requirements.txt .
# RUN pip3 install -r requirements.txt

ENV PYTHONPATH=$PYTHONPATH:/src/

COPY ./ /src/
# COPY --chown=app:app ./ /src

# RUN mkdir /src/data

# RUN chown -R app:app /src/uploads

# USER app

WORKDIR /src

RUN pip3 install -U sentence_transformers --extra-index-url https://download.pytorch.org/whl/cpu
RUN pip3 install -r requirements.txt

FROM base as build
ENTRYPOINT ["python3", "/src/cerebellum.py"]
