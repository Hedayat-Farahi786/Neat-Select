// src/components/Upload.jsx
import React from 'react';
import { Upload as UploadIcon } from 'react-feather';

const Upload = ({ onFilesSelected }) => {
  const handleFileChange = (e) => {
    const inputFiles = e.target.files;
    const fileArray = Array.from(inputFiles).filter(
      (file) =>
        !file.webkitRelativePath.includes('node_modules') &&
        !file.webkitRelativePath.includes('.git')
    );
    onFilesSelected(fileArray);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-gray-300 rounded-md">
      <UploadIcon size={48} className="text-gray-400" />
      <p className="mt-2 text-gray-600">Upload your project folder</p>
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        multiple
        onChange={handleFileChange}
        className="mt-4"
      />
    </div>
  );
};

export default Upload;
