import React from "react";
import "./App.css";
import Main from "./containers/Main";
import { chosenTheme } from "./theme";

function App() {
  return <Main theme={chosenTheme} />;
}

export default App;
