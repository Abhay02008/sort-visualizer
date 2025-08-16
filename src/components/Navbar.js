import React from 'react';
import '../styles/main.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h1>Sorting Visualizer</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/algorithms">Algorithms</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
