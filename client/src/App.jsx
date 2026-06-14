import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import DarkVeil from './components/DarkVeil';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="bg-container">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0.02}
            scanlineIntensity={0.1}
            speed={0.2}
            scanlineFrequency={2.0}
            warpAmount={0.1}
          />
        </div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<PostForm />} />
            <Route path="/edit/:id" element={<PostForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
