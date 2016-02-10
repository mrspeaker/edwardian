import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App";
import Game from "./src/Game";

const game = new Game();

ReactDOM.render(
  <App game={game} />,
  document.querySelector("#container")
);
