import React from "react";
import Player from "./components/Player";
import { Provider } from "react-redux";

import store from "./store";
import "./sass/App.scss";

function App() {
  return (
    <div className="App">
      <div className="player-wrapper">
        <Provider store={store}>
          <Player />
        </Provider>
      </div>
    </div>
  );
}

export default App;
