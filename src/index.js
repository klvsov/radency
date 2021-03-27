import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const Global = createGlobalStyle`
  * {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  }

  body{
    background: rgba(0, 0, 0, 0.1)
  }
`;

ReactDOM.render(
  <>
    <Global />
    <App />
  </>,
  document.getElementById('root')
);
