// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';  // CSS 파일을 모듈로 import
import App from './App.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
