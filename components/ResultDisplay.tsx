
import React, { useState, useEffect } from 'react';
import { ErrorIcon } from './IconComponents';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  audioUrl: string | null;
}

const loadingMessages = [
  "Analyzing voice characteristics...",
  "Building vocal profile...",
  "Synthesizing speech from text...",
  "Applying intonation and emotion...",
  "Finalizing audio output...",
];

const Loader: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        if (messageIndex < loadingMessages.length - 1) {
            const timer = setTimeout(() => {
                setMessageIndex(prev => prev + 1);
            }, 800); // Change message every 0.8 seconds
            return () => clearTimeout(timer);
        }
    }, [messageIndex]);

    return (
        <div className="flex flex-col items-center justify-center text-center p-4 bg-gray-900/50 rounded-lg">
            <svg className="animate-spin h-8 w-8 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-semibold text-white">{loadingMessages[messageIndex]}</p>
        </div>
    );
};


const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, audioUrl }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg">
        <ErrorIcon />
        <span className="font-medium">{error}</span>
      </div>
    );
  }

  if (audioUrl) {
    return (
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Generated Audio</h3>
        <audio controls src={audioUrl} className="w-full">
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

  return null;
};

export default ResultDisplay;
