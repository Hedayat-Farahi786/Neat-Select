// src/utils/fileIcons.js
import {
    FaJs,
    FaHtml5,
    FaCss3Alt,
    FaPython,
    FaJava,
    FaFileCode,
    FaFileAlt,
  } from 'react-icons/fa';
  import { SiTypescript } from 'react-icons/si';
  import { VscJson } from 'react-icons/vsc';
  
  export const getIconByFilename = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    switch (extension) {
      case 'js':
        return FaJs;
      case 'jsx':
        return FaJs;
      case 'ts':
        return SiTypescript;
      case 'tsx':
        return SiTypescript;
      case 'html':
        return FaHtml5;
      case 'css':
        return FaCss3Alt;
      case 'json':
        return VscJson;
      case 'py':
        return FaPython;
      case 'java':
        return FaJava;
      default:
        return FaFileAlt;
    }
  };
  