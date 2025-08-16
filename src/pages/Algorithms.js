import React from 'react';
import AlgorithmCard from '../components/AlgorithmCard';
import '../styles/main.css';

const algorithms = [
  { name: "Bubble Sort", desc: "Simple & intuitive sorting algorithm.", value: "bubbleSort" },
  { name: "Selection Sort", desc: "Selects minimum element step by step.", value: "selectionSort" },
  { name: "Insertion Sort", desc: "Builds the sorted array one element at a time.", value: "insertionSort" },
  { name: "Merge Sort", desc: "Divide and conquer sorting.", value: "mergeSort" },
  { name: "Quick Sort", desc: "Efficient divide and conquer.", value: "quickSort" },
  { name: "Heap Sort", desc: "Uses a heap data structure.", value: "heapSort" },
  { name: "Shell Sort", desc: "Improves insertion sort using gaps.", value: "shellSort" },
  { name: "Radix Sort", desc: "Sorts numbers by digits.", value: "radixSort" },
  { name: "Bucket Sort", desc: "Sorts via multiple buckets.", value: "bucketSort" },
];


function Algorithms() {
  return (
    <div
      className="algorithm-grid"
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '2rem' }}
    >
      {algorithms.map((algo) => (
        <AlgorithmCard
           key={algo.name} 
           name={algo.name}
           desc={algo.desc}
           value={algo.value}
        />
      ))}
    </div>
  );
}

export default Algorithms;
