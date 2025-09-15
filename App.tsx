
import React, { useState, useCallback, FormEvent } from 'react';
import AudioUploader from './components/AudioUploader';
import ResultDisplay from './components/ResultDisplay';
import { MagicWandIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);

  const handleAudioFile = useCallback((file: File) => {
    setAudioFile(file);
    setGeneratedAudioUrl(null); 
    setError(null);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!audioFile || !text) {
      setError('Please provide both an audio file and a text prompt.');
      return;
    }

    setError(null);
    setGeneratedAudioUrl(null);
    setIsLoading(true);

    // --- AI Simulation ---
    // In a real application, you would send the audioFile and text to a
    // backend service that interfaces with a voice cloning AI model.
    // Since Gemini API does not support this, we simulate the process.
    setTimeout(() => {
      // Simulate a successful generation with a placeholder audio file.
      // This demonstrates the complete UI flow.
      setGeneratedAudioUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
      setIsLoading(false);
    }, 4000); // Simulate a 4-second processing time
  };

  const isButtonDisabled = !audioFile || !text.trim() || isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            AI Voice Cloner
          </h1>
          <p className="text-lg text-gray-400 mt-2 max-w-xl mx-auto">
            Upload a voice sample, provide the script, and hear the magic.
            <br />
            <span className="text-sm text-gray-500">(This is a UI demonstration)</span>
          </p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-lg font-semibold text-white">1. Voice Sample</label>
                <AudioUploader onFileChange={handleAudioFile} audioFile={audioFile} />
              </div>
              <div className="space-y-2">
                <label htmlFor="text-prompt" className="text-lg font-semibold text-white">2. Text to Speak</label>
                <textarea
                  id="text-prompt"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter the text you want the cloned voice to say..."
                  className="w-full h-36 p-4 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none text-gray-300 placeholder-gray-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full flex items-center justify-center gap-3 text-lg font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out ${
                isButtonDisabled
                  ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/50'
              }`}
            >
              <MagicWandIcon />
              {isLoading ? 'Generating...' : 'Clone Voice'}
            </button>
          </form>

          <div className="mt-8">
            <ResultDisplay
              isLoading={isLoading}
              error={error}
              audioUrl={generatedAudioUrl}
            />
          </div>
        </main>
        <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} AI Voice Cloner UI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
