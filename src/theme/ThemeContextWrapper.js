import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from '../contexts/ThemeContext/ThemeContext.js';


export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.dark);

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add('white-content');
        document.body.classList.remove('dark-content');
        break;
      case themes.dark:
        document.body.classList.add('dark-content');
        document.body.classList.remove('white-content');
        break;
      default:
        document.body.classList.remove('white-content');
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}