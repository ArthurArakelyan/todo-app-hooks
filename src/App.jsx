import React from 'react';

import { useTheme } from './contexts/ThemeProvider';

import TodoList from './components/TodoList';

const App = () => {
  const theme = useTheme();

  return (
    <div className={`App ${theme.theme}`}>
      <button
        className="themeChange"
        onClick={theme.changeTheme}
      >
        <i className="far fa-sun"></i>
      </button>
      <div className="wrapper">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
