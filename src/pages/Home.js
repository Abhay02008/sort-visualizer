import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/visualizer');
  };

  return (
    <div>
      <section className="hero">
        <h2>Discover the Magic of Sorting Algorithms</h2>
        <p>
          Visualize sorting algorithms in real time: see how Bubble, Merge, Quick, Heap, Shell, Radix, and Bucket sorts work. Adjust speed, array size, and more. <br /> Shine bright in coding interviews and understand the inner workings of each algorithm!
        </p>
        <button onClick={handleStart} style={{ cursor: 'pointer' }}>
          Start Visualizing
        </button>
      </section>
      <section className="features">
        <div className="feature-card">✨ Live Algorithm Visuals</div>
        <div className="feature-card">⚡ Interactive Controls</div>
        <div className="feature-card">📚 Stepwise Learning</div>
      </section>
    </div>
  );
}

export default Home;
