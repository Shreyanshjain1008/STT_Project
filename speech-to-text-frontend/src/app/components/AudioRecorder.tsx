"use client";
import { useState, useRef, useEffect } from 'react';

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            const audioChunks: Blob[] = [];
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunks.push(e.data);
            };

            mediaRecorder.onstop = () => handleTranscription(audioChunks);
            mediaRecorder.start();
            setIsRecording(true);
            setTranscript('Recording...');
        } catch (error: any) {
            console.error("Error accessing microphone:", error);
            setTranscript(`Error: ${error.message}`);
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        streamRef.current?.getTracks().forEach(track => track.stop());
        setIsRecording(false);
    };

    const handleTranscription = async (audioChunks: Blob[]) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        if (!API_URL) {
            console.error('NEXT_PUBLIC_API_URL is not set');
            return;
        }

        try {
            setTranscript('Processing...');
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const formData = new FormData();
            formData.append('audio_file', audioBlob);

            const response = await fetch(`${API_URL}/transcribe`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`API HTTP Error: ${response.status} - ${await response.text()}`);
            }

            const data = await response.json();
            setTranscript(data.transcript || 'No transcript returned');
        } catch (error: any) {
            console.error("Transcription failed:", error);
            setTranscript(`Transcription Failed: ${error.message}`);
        }
    };

    useEffect(() => {
        return () => {
            if (mediaRecorderRef.current?.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
            streamRef.current?.getTracks().forEach(track => track.stop());
        };
    }, []);

    return (
        <div className="p-4">
            <div className="space-y-4">
                <div className="flex justify-center">
                    <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`px-4 py-2 rounded-lg ${
                            isRecording 
                                ? 'bg-red-500 hover:bg-red-600' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white font-semibold transition-colors`}
                    >
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                </div>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg min-h-[100px]">
                    <p className="text-gray-700">{transcript}</p>
                </div>
            </div>
        </div>
    );
};

export default AudioRecorder;