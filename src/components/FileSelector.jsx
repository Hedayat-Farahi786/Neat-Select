// src/components/FileSelector.jsx
import React, { useState, useEffect } from "react";
import { X } from "react-feather";
import { Tree } from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getExtension } from "../utils/fileUtils";
import { defaultStyles, FileIcon } from "react-file-icon";

const FileSelector = ({
  files,
  onSelectionChange,
  excludedDirs,
  onAddExcludeFolder,
  onRemoveExcludeFolder,
  toggleSelectAll,
  selectAll,
  selectedFiles,
}) => {
  const [customExclude, setCustomExclude] = useState("");
  const [treeData, setTreeData] = useState([]);

  // Build tree data from files
  useEffect(() => {
    const buildTree = () => {
      const idCounter = { current: 0 };
      const pathMap = {};

      const getNodeId = () => {
        idCounter.current += 1;
        return idCounter.current;
      };

      const nodes = [];

      files.forEach((file) => {
        const parts = file.webkitRelativePath.split("/");
        let currentParentId = 0;

        parts.forEach((part, index) => {
          const path = parts.slice(0, index + 1).join("/");
          const isFile = index === parts.length - 1;

          if (!pathMap[path]) {
            const node = {
              id: getNodeId(),
              parent: currentParentId,
              droppable: !isFile,
              text: part,
              data: {
                path,
                isFile,
                file: isFile ? file : null,
              },
            };
            pathMap[path] = node;
            nodes.push(node);
          }

          currentParentId = pathMap[path].id;
        });
      });

      setTreeData(nodes);
    };

    buildTree();
  }, [files]);

  const handleAddExclude = () => {
    const folderName = customExclude.trim();
    if (folderName !== "") {
      if (excludedDirs.includes(folderName)) {
        alert(`Folder "${folderName}" is already excluded.`);
      } else {
        onAddExcludeFolder(folderName);
      }
      setCustomExclude("");
    }
  };

  const handleRemoveExclude = (folderName) => {
    onRemoveExcludeFolder(folderName);
  };

  const isFileSelected = (filePath) =>
    selectedFiles.some((f) => f.webkitRelativePath === filePath);

  const handleSelect = (node) => {
    const { path, isFile, file } = node.data;
    if (isFile) {
      const isSelected = isFileSelected(path);
      onSelectionChange(file, !isSelected);
    }
  };

  const renderNode = (node, { depth, isOpen, onToggle }) => {
    const { path, isFile } = node.data;
    const isExcluded = excludedDirs.some((dir) => path.includes(dir));
    const isSelected = isFileSelected(path);

    return (
      <div
        style={{
          marginLeft: depth * 20,
          opacity: isExcluded ? 0.5 : 1,
          backgroundColor: isSelected ? "#DBEAFE" : "transparent",
          cursor: "pointer",
        }}
        className="flex items-center py-1 px-2"
      >
        {node.droppable ? (
          <span
            onClick={onToggle}
            style={{ marginRight: 5, fontSize: "0.8rem" }}
          >
            {isOpen ? (
              <span role="img" aria-label="open folder">
                ⯆ 📂
              </span>
            ) : (
              <span role="img" aria-label="closed folder">
                ⯈ 📁
              </span>
            )}
          </span>
        ) : (
          <div className="flex items-center">
            <div className="w-3 mr-5">
              <FileIcon
                extension={getExtension(node.text)}
                {...defaultStyles[getExtension(node.text)]}
                size={14} // Small size for file icons
                style={{ marginRight: 5 }}
              />
            </div>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleSelect(node)}
              className="mr-2"
            />
          </div>
          //   <span style={{ marginRight: 5, fontSize: '0.8rem' }}>•</span>
        )}

        <span className="text-sm">{node.text}</span>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col p-5">

      {/* Exclude Folders Input */}
      <div className="mb-4">
      <div className="flex justify-between items-center mb-4">
 
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Exclude Folders
        </h3>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Selected Files: {selectedFiles.length}
        </span>
      </div>
        <div className="mb-4 flex flex-wrap">
          {excludedDirs.map((folder, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-sm mr-2 mt-2"
            >
              {folder}
              <X
                size={16}
                className="ml-1 cursor-pointer"
                onClick={() => handleRemoveExclude(folder)}
              />
            </span>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={customExclude}
            onChange={(e) => setCustomExclude(e.target.value)}
            placeholder="Enter folder name to exclude"
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            onClick={handleAddExclude}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
      
      </div>

      {/* Toggle Select All Button
      <div className="mb-4">
        <button
          onClick={toggleSelectAll}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {selectAll ? "Unselect All" : "Select All"}
        </button>
      </div> */}

      {/* Tree View */}
      <div className="flex-grow overflow-auto">
        <DndProvider backend={HTML5Backend}>
          <Tree
            tree={treeData}
            rootId={0}
            render={renderNode}
            onDrop={() => {}}
            canDrag={() => false}
          />
        </DndProvider>
      </div>
    </div>
  );
};

export default FileSelector;
