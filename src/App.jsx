import React from "react";
import MindClear from "./components/MindClear";
import CursorTrail from "./components/CursorTrail";
import "./index.css";

function App() {
  return (
    <div 
      className="App"
      style={{
        width: '100%',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        position: 'relative'
      }}
    >
      <CursorTrail />
      <MindClear />
    </div>
  );
}

export default App;
