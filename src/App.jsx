import React from "react";
import "./App.css";
import Main from "./components/Main";

const title = "Cryptocurrency Exchange";

const App = () => {
  return (
    <div className="dark-monster">
      <header className="app-header">
        <h2 className="app-title">{title}</h2>
      </header>
      <Main />
    </div>
  );
};

export default App;
