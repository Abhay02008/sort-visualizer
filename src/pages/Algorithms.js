import React from 'react';
import '../styles/main.css';

const algorithms = [
  { name: "Bubble Sort", desc: "Simple & intuitive sorting algorithm." },
  { name: "Selection Sort", desc: "Selects minimum element step by step." },
  { name: "Insertion Sort", desc: "Builds the sorted array one element at a time." },
  { name: "Merge Sort", desc: "Divide and conquer sorting." },
  { name: "Quick Sort", desc: "Efficient divide and conquer." },
  { name: "Heap Sort", desc: "Uses a heap data structure." },
  { name: "Shell Sort", desc: "Improves insertion sort using gaps." },
  { name: "Radix Sort", desc: "Sorts numbers by digits." },
  { name: "Bucket Sort", desc: "Sorts via multiple buckets." },
];

function Algorithms() {
  return (
    <div className="algorithm-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '2rem' }}>
      {algorithms.map(algo => (
        <div className="feature-card" key={algo.name} style={{ minWidth: '210px', margin: '1rem' }}>
          <h4>{algo.name}</h4>
          <p style={{ color: '#efeefe' }}>{algo.desc}</p>
          {/* Explore functionality to be added later */}
        </div>
      ))}
    </div>
  );
}

export default Algorithms;
