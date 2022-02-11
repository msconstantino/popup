import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from "./Home";
import { useState, useEffect } from "react";
import { Popup } from "./Popup";
import ContentstackUIExtension from "@contentstack/ui-extensions-sdk";

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