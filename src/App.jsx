// src/App.jsx
import React, { useState, useCallback, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ConfirmationModal from './components/ConfirmationModal';
import FileSelector from './components/FileSelector';
import FileDisplay from './components/FileDisplay';
import Navbar from './components/Navbar';

function App() {
  const [allFiles, setAllFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [excludedDirs, setExcludedDirs] = useState(['node_modules', '.git', 'package-lock.json', 'package.json']);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [theme, setTheme] = useState('light');
  const [selectAll, setSelectAll] = useState(false);

  const handleFilesSelected = (acceptedFiles) => {
    setAllFiles(acceptedFiles);
    filterFiles(acceptedFiles, excludedDirs);
    setShowConfirmation(true);
  };

  const filterFiles = (fileArray, excludeFolders) => {
    const filteredFiles = fileArray.filter(
      (file) =>
        !excludeFolders.some((folder) =>
          file.webkitRelativePath.includes(folder)
        )
    );
    setFiles(filteredFiles);
    setSelectedFiles([]); // Reset selected files
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleSelectionChange = useCallback(
    (file, isSelected) => {
      if (isSelected) {
        // Check if the file is already selected
        if (
          !selectedFiles.some(
            (f) => f.webkitRelativePath === file.webkitRelativePath
          )
        ) {
          setSelectedFiles((prev) => [...prev, file]);
        }
      } else {
        setSelectedFiles((prev) =>
          prev.filter(
            (f) => f.webkitRelativePath !== file.webkitRelativePath
          )
        );
      }
    },
    [selectedFiles]
  );

  const handleAddExcludeFolder = (folderName) => {
    if (folderName.trim() !== '') {
      const newExcludedDirs = [...excludedDirs, folderName.trim()];
      setExcludedDirs(newExcludedDirs);
      filterFiles(allFiles, newExcludedDirs);
    }
  };

  const handleRemoveExcludeFolder = (folderName) => {
    const newExcludedDirs = excludedDirs.filter((dir) => dir !== folderName);
    setExcludedDirs(newExcludedDirs);
    filterFiles(allFiles, newExcludedDirs);
  };

  const handleSelectAll = () => {
    setSelectedFiles(files);
  };

  const handleUnselectAll = () => {
    setSelectedFiles([]);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      handleUnselectAll();
    } else {
      handleSelectAll();
    }
    setSelectAll(!selectAll);
  };

  // Theme toggling
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      {allFiles.length === 0 ? (
        <LandingPage onFilesSelected={handleFilesSelected} />
      ) : (
        <div className="flex h-[calc(100vh-64px)]">
          <ConfirmationModal
            isOpen={showConfirmation}
            onClose={handleCloseConfirmation}
            fileCount={files.length}
          />
          {/* Left Panel */}
          <div className="w-1/3 border-r overflow-hidden bg-gray-100 dark:bg-gray-800">
            <FileSelector
              files={files}
              onSelectionChange={handleSelectionChange}
              excludedDirs={excludedDirs}
              onAddExcludeFolder={handleAddExcludeFolder}
              onRemoveExcludeFolder={handleRemoveExcludeFolder}
              toggleSelectAll={toggleSelectAll}
              selectAll={selectAll}
              selectedFiles={selectedFiles}
            />
          </div>
          {/* Right Panel */}
          <div className="w-2/3 overflow-auto p-4 bg-white dark:bg-gray-900">
            <FileDisplay selectedFiles={selectedFiles} />
          </div>
          
        </div>
      )}
    </>
  );
}

export default App;
