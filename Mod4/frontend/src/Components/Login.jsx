import React, { useState } from "react";
import ReactSwitch from "react-switch"
export default function Login({ openMain, theme, toggleTheme }) {
  return (
    <div>
      <div className="container">
        <div className="box">

              <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
          <form className="inputContainer" id={theme}>
            <h1>Login</h1>
            <div className="usernameContainer">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="userName"
                placeholder="Enter Username"
              />
            </div>
            <div className="passwordContainer">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="password"
                placeholder="Enter password"
              />
            </div>
            <div className="buttonContainer">
              <button onClick={openMain}>Login In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
