import React, { createContext, useState, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#406F77",
    },
    secondary: {
      main: '#E28065',
      light: '#FFFFFF'
    },
    background: { 
      default: "#FFFFFF", 
    }
  },
  typography: {  
    fontFamily: 'Arial',
    h1: { fontSize: '3rem', fontWeight: 'bold', textTransform: 'uppercase' },
    h2: { fontSize: '1.7rem', fontWeight: 'bold', textTransform: 'uppercase' },
    h3: { fontSize: '1.5rem', fontWeight: 'bold', textTransform: 'uppercase' },
    h4: { fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase' },
    body1: { fontSize: '1rem', padding: '1px' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1280,
      xl: 1920,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: '#101011',
    },
    background: { 
      default: "#383838",
      paper:  "#121212", 
    },
    text: {
      primary: "#E9E9E9",
    },
  },
  typography: lightTheme.typography, // Typografie zůstává stejná
});

export default function CustomThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = {
    isDarkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}