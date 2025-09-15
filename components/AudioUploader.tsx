
import React, { useCallback, useRef } from 'react';
import { UploadIcon, MicIcon } from './IconComponents';

interface AudioUploaderProps {
  onFileChange: (file: File) => void;
  audioFile: File | null;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onFileChange, audioFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  }, [onFileChange]);

  const handleClick = () => {
    inputRef.current?.click();
  };
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      onFileChange(file);
    }
  }, [onFileChange]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <label
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-700/50 transition-colors duration-200"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
        {audioFile ? (
            <>
                <MicIcon className="w-10 h-10 mb-3 text-indigo-400" />
                <p className="mb-2 text-sm text-gray-300 font-semibold">File ready!</p>
                <p className="text-xs text-gray-400 truncate max-w-xs">{audioFile.name}</p>
            </>
        ) : (
            <>
                <UploadIcon className="w-10 h-10 mb-3 text-gray-500" />
                <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">MP3, WAV, FLAC (MAX. 25MB)</p>
            </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="audio/*"
        onChange={handleFileChange}
      />
    </label>
  );
};

export default AudioUploader;
