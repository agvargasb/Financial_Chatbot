FROM python:3.10 as base

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

COPY ./ /src
# COPY --chown=app:app ./ /src

# RUN mkdir /src/feedback
# RUN mkdir /src/static
# RUN mkdir /src/static/uploads

# RUN chown -R app:app /src/feedback
# RUN chown -R app:app /src/static
# RUN chown -R app:app /src/static/uploads

# USER app

WORKDIR /src

RUN pip install --upgrade pip && pip install -r requirements.txt

FROM base as build
ENTRYPOINT ["gunicorn", "--workers=8", "--bind", "0.0.0.0:5000", "app:app"]
