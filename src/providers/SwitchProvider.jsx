import { createContext, useState, useContext } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { orange, deepPurple } from '@mui/material/colors';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [modeColor, setModeColor] = useState('dark');

  const toggleTheme = () => {
    setModeColor((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode: modeColor,
      primary: modeColor === 'dark' ? orange : deepPurple,
    },
  });

  return (
    <ThemeContext.Provider value={{ modeColor, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
