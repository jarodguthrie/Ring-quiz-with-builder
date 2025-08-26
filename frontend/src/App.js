import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RingBuilder from "./components/RingBuilder/RingBuilder";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RingBuilder />} />
          <Route path="/ring-builder" element={<RingBuilder />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}