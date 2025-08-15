import React, { useState } from 'react';
import '../styles/main.css';

function Visualizer() {
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(5); // arbitrary value for now
  
  // Dummy array visualization for now
  const array = Array.from({length: arraySize}, () => Math.floor(Math.random() * 500));
  
  return (
    <div style={{padding: '2rem'}}>
      <h2 style={{color: '#00ffe7'}}>Sorting Visualizer</h2>
      <div style={{margin: '2rem 0'}}>
        <label>
          Array Size:&nbsp;
          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={e => setArraySize(Number(e.target.value))}
          />
        </label>
        <span style={{marginLeft:'1rem'}}>{arraySize}</span>
        <br /><br />
        <label>
          Sort Speed:&nbsp;
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
          />
        </label>
        <span style={{marginLeft:'1rem'}}>{speed}</span>
      </div>
      {/* Simple array bars */}
      <div style={{height:'250px', display:'flex', alignItems:'flex-end', gap:'2px', background:'#181818', borderRadius:'6px', padding:'1rem'}}>
        {array.map((val, idx) => (
          <div
            key={idx}
            style={{
              height: `${val}px`,
              width: `${1000/arraySize}px`,
              background: 'linear-gradient(90deg, #00ffe7 40%, #ff0080 100%)',
              borderRadius: '4px'
            }}
          />
        ))}
      </div>
      {/* Add controls and animation logic here later */}
    </div>
  );
}

export default Visualizer;
