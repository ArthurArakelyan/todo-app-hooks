import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {ThemeProvider} from './contexts/ThemeProvider';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
