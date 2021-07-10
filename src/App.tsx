import React from "react";
import { getRandomNum } from "@/util/math";

function App() {
  return (
    <>
      <h1>hello App</h1>
      <span>{getRandomNum(0, 100)}</span>
    </>
  );
}

export default App;
