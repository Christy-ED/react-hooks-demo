// src/App.jsx
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import UserList from './components/UserList';

function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>React Hooks Demo</h1>
        <ThemeToggle />  {/* These components can now safely use `useTheme` */}
        <UserList />
      </div>
    </ThemeProvider>
  );
}

export default App;
