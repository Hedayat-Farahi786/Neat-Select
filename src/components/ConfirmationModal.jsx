// src/components/ConfirmationModal.jsx
import React from 'react';
import { CheckCircle } from 'react-feather';

const ConfirmationModal = ({ isOpen, onClose, fileCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center w-11/12 max-w-md">
        <CheckCircle
          size={48}
          className="text-green-500 dark:text-green-400 mx-auto"
        />
        <h2 className="mt-4 text-2xl font-bold dark:text-gray-100">
          Upload Successful!
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {fileCount} files have been uploaded successfully.
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
