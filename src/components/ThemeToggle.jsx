import React from 'react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme, themeStyles } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: themeStyles.buttonBackground,
        color: themeStyles.buttonColor,
        padding: "10px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Theme
    </button>
  );
}

export default ThemeToggle;
