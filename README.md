# STT_Project
Full-Stack STT App (Next.js/Flask) converts voice to text. Frontend captures audio; Flask backend preprocesses audio (16kHz, 16-bit WAV via pydub), handles CORS, and securely calls the Deepgram API via a Bearer token for real-time transcription. Demonstrates robust full-stack data flow and API integration.

## Full-Stack Speech-to-Text (STT) Application
A robust web application designed to convert spoken audio into accurate, readable text in real-time. This project utilizes a decoupled full-stack architecture to manage audio capture, processing, and external API transcription securely and efficiently.

--> Features
Real-time Audio Capture: Uses the browser's native MediaRecorder API for efficient microphone input.

Decoupled Architecture: Next.js frontend communicates with a separate Flask API for processing.

Critical Audio Preprocessing: The backend utilizes the pydub library and FFmpeg to convert raw browser audio into the mandatory 16kHz, 16-bit, mono WAV format for optimal STT performance.

Secure API Integration: Transcribes audio using the high-performance Deepgram API with secure Bearer Token authentication.

Cross-Origin Resource Sharing (CORS) Handling: Successfully implemented Flask-CORS to enable seamless communication between different frontend and backend origins.

Responsive UI: Built with Tailwind CSS for a clean, intuitive, and responsive interface across devices.

--> Tech Stack
Frontend
Framework: Next.js (React)

Styling: Tailwind CSS

State Management: React Hooks (useState, useRef)

Backend
Framework: Flask (Python)

Dependencies: python-dotenv, Flask-CORS, requests, pydub

STT Provider: Deepgram API (V1 Listen Endpoint)

--? Local Setup and Installation
This project requires setting up two separate environments: the Python backend and the Next.js frontend.

Prerequisites
You must have the following installed on your system:

Node.js (LTS) and npm

Python 

FFmpeg: The pydub library requires FFmpeg to handle audio conversions.


Step 1: Backend Setup
Navigate to the backend directory:

Bash

cd speech-to-text-backend
Create and activate a virtual environment:

Bash

python3 -m venv venv
source venv/bin/activate
Install Python dependencies:

Bash

pip install Flask python-dotenv Flask-CORS requests pydub gunicorn
Configure API Key: Create a file named .env in the speech-to-text-backend root and add your Deepgram API Key:

STT_API_KEY="FULL_DEEPGRAM_API_KEY_HERE"
Step 2: Frontend Setup
Navigate to the frontend directory:

Bash

cd speech-to-text-frontend
Install dependencies:

Bash

npm install

Configure API Endpoint: Create a file named .env.local in the speech-to-text-frontend root to point to the local Flask server:

NEXT_PUBLIC_API_URL="http://localhost:5000"
--> Running the Application
Both the backend and frontend servers must be running simultaneously.

1. Start the Backend (Flask)
From the speech-to-text-backend directory:

Bash

source venv/bin/activate
python app.py
(The server will run on http://localhost:5000)

2. Start the Frontend (Next.js)
From the speech-to-text-frontend directory:

Bash

npm run dev

(The application will open on http://localhost:3000)

--> Architecture and Data Flow
The success of this application relies on the following precise data flow:

Frontend Capture: User clicks "Start Recording." The browser's MediaRecorder captures audio chunks and bundles them into a WebM/WAV Blob.

Request: The frontend sends a POST request containing the audio Blob (as FormData) to the Flask endpoint: /transcribe.

Backend Processing:

Flask receives the file.

pydub loads the audio and converts it to 16kHz, 16-bit, Mono format.

The requests library sends the processed audio to the Deepgram API using the secure Authorization: Bearer <Key> header and the robust query string parameters (?sample_rate=16000&encoding=linear16).

Response: Deepgram returns the transcript, which Flask parses and sends back to the frontend as a JSON response.

Display: The Next.js component updates the UI with the final transcribed text.
