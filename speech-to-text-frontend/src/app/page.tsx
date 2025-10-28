import AudioRecorder from './components/AudioRecorder';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Speech to Text Converter
        </h1>
        <AudioRecorder />
      </div>
    </main>
  );
}