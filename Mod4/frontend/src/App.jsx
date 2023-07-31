import React, { useEffect, useState } from "react";
import Login from "./Components/Login";
import MainWindow from "./Components/MainWindow";
import "./styles.css";
import ReactSwitch from "react-switch";

export const ThemeContext = React.createContext(null);

function App() {
  const [login, setLogin] = useState(false)
  const [theme, setTheme] = useState("light");


  useEffect(() => {
    const initialState = localStorage.getItem("THEME")
    setTheme(initialState ? initialState : theme)
  }, [])

  const openMain = () => {
    setLogin((login) => !login)
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem('THEME', newTheme)
      return newTheme

    });
  };


  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {login ? (
          <>
            <MainWindow theme={theme} toggleTheme={toggleTheme} />
          </>
        ) : (
          <>
            <Login openMain={openMain} theme={theme} toggleTheme={toggleTheme}/>
          </>
        )}
      </ThemeContext.Provider>
    </>
  );
}

export default App;
