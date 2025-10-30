
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import ErrorBoundary from "./ErrorBoundary";
import "./styles.css";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
