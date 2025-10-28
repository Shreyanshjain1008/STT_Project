FROM python:3.12-slim

# install ffmpeg and system deps
RUN apt-get update && apt-get install -y ffmpeg gcc libsndfile1 --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app

# install python deps
RUN pip install --upgrade pip
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# expose port (Render sets $PORT)
EXPOSE 5000
# use gunicorn to serve app; app.py must expose "app"
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000", "--workers", "1", "--threads", "4"]