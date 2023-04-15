import logo from "./logo.svg";
import "./App.css";
import React, { Suspense, useState } from "react";
import loadable from "@loadable/component";

// React.lazy
// const SplitMe = React.lazy(() => import("./SplitMe"));

// loadable components
const SplitMe = loadable(() => import("./SplitMe"));

const App = () => {
  const [visible, setVisible] = useState(false);
  const onCLick = () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    SplitMe.preload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onCLick} onMouseOver={onMouseOver}>
          Hello React!
        </p>
        <Suspense fallback={<div>loadding...</div>}>
          {visible && <SplitMe />}
        </Suspense>
      </header>
    </div>
  );
};

export default App;
