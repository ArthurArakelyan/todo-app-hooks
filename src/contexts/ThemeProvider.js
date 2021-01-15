import React, {useContext} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = React.createContext();

function useTheme() {
  return useContext(ThemeContext);
}

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const changeTheme = () => {
    setTheme(theme => {
      return theme === 'light' ? 'dark' : 'light';
    });
  }

  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export {
  useTheme,
  ThemeProvider
}
