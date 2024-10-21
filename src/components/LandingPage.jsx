// src/components/LandingPage.jsx
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'react-feather';

const LandingPage = ({ onFilesSelected }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    webkitdirectory: true,
    directory: true,
    multiple: true,
    onDrop: (acceptedFiles) => {
      onFilesSelected(acceptedFiles);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Welcome to Project Viewer
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-xl">
        Upload your project folder to view and manage your files effortlessly.
      </p>
      <div
        {...getRootProps()}
        className={`w-2/3 md:w-1/2 lg:w-1/3 p-8 text-center border-2 border-dashed rounded-lg cursor-pointer transition ${
          isDragActive
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900'
            : 'border-gray-300 bg-white dark:bg-gray-800'
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud
          size={48}
          className="mx-auto text-gray-400 dark:text-gray-200"
        />
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {isDragActive
            ? 'Drop the folder here...'
            : 'Drag & Drop your project folder or click to upload'}
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
