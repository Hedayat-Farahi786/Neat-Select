// src/components/FileDisplay.jsx
import React, { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  dracula,
  vscDarkPlus,
  vs,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileText } from 'react-feather';

const FileDisplay = ({ selectedFiles }) => {
  const [fileContents, setFileContents] = useState({});

  useEffect(() => {
    // Load contents of selected files
    selectedFiles.forEach((file) => {
      if (!fileContents[file.webkitRelativePath]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFileContents((prev) => ({
            ...prev,
            [file.webkitRelativePath]: e.target.result,
          }));
        };
        reader.readAsText(file);
      }
    });

    // Clean up contents of unselected files
    const selectedPaths = selectedFiles.map((file) => file.webkitRelativePath);
    setFileContents((prev) => {
      const newContents = {};
      selectedPaths.forEach((path) => {
        if (prev[path]) {
          newContents[path] = prev[path];
        }
      });
      return newContents;
    });
  }, [selectedFiles]);

  if (selectedFiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
        <FileText size={64} className="mb-4" />
        <p className="text-xl">Please select a file to display its content.</p>
      </div>
    );
  }

  return (
    <div>
        {/* Copy Button */}
        {selectedFiles.length > 0 && (
            <button
              onClick={() => {
                const textToCopy = selectedFiles
                  .map(
                    (file) =>
                      `${file.webkitRelativePath}:\n${fileContents[file.webkitRelativePath]}`
                  )
                  .join('\n\n');
                navigator.clipboard.writeText(textToCopy);
              }}
              className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-110"
            >
              Copy All
            </button>
          )}
      {selectedFiles.map((file, index) => {
        const filename = getFilename(file);
        const content = fileContents[file.webkitRelativePath] || '';
        return (
          <div key={index} className="mb-8">
            <h3 className="font-semibold text-lg mb-2 dark:text-gray-100">
              {file.webkitRelativePath}
            </h3>
            <SyntaxHighlighter
              language={getLanguage(filename)}
              style={
                document.documentElement.className === 'dark'
                  ? vscDarkPlus
                  : vs
              }
              customStyle={{
                fontSize: '0.9rem',
                backgroundColor:
                  document.documentElement.className === 'dark'
                    ? '#1e1e1e'
                    : '#f5f5f5',
              }}
            >
              {content}
            </SyntaxHighlighter>
          </div>
        );
      })}
    </div>
  );
};

const getFilename = (file) => {
  if (file.name) return file.name;
  if (file.webkitRelativePath) {
    const parts = file.webkitRelativePath.split('/');
    return parts[parts.length - 1];
  }
  return '';
};

const getLanguage = (filename) => {
  if (!filename) return 'text';
  const extension = filename.split('.').pop().toLowerCase();
  switch (extension) {
    // Include as many file extensions as possible
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'json':
      return 'json';
    case 'py':
      return 'python';
    case 'java':
      return 'java';
    case 'rb':
      return 'ruby';
    case 'php':
      return 'php';
    case 'go':
      return 'go';
    case 'c':
    case 'cpp':
      return 'cpp';
    case 'cs':
      return 'csharp';
    case 'swift':
      return 'swift';
    case 'kt':
    case 'kts':
      return 'kotlin';
    case 'sh':
      return 'bash';
    case 'md':
      return 'markdown';
    // Add more cases as needed
    default:
      return 'text';
  }
};

export default React.memo(FileDisplay);
