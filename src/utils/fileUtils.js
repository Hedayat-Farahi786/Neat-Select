// src/utils/fileUtils.js
export const getExtension = (filename) => {
    const parts = filename.split('.');
    if (parts.length > 1) {
      return parts.pop().toLowerCase();
    }
    return '';
  };
  