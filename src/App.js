import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from "./Home";
import { Popup } from "./Popup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/son" element={<Popup />}/>
        <Route path="/" element={<Home />}/>
        {/* <Navigate from="*" to="/" /> */}
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;