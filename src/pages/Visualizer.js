import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { bubbleSort } from '../algorithms/bubbleSort';
import { selectionSort } from '../algorithms/selectionSort';
import { insertionSort } from '../algorithms/insertionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { quickSort } from '../algorithms/quickSort';
import { heapSort } from '../algorithms/heapSort';
import { shellSort } from '../algorithms/shellSort';
import { radixSort } from '../algorithms/radixSort';
import { bucketSort } from '../algorithms/bucketSort';

const algorithmsMap = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  shellSort,
  radixSort,
  bucketSort,
};
const speedChoices = [
  { label: '0.5x (Slowest)', value: 2 },
  { label: '1x', value: 0.80 },
  { label: '2x', value: 0.35 },
  { label: '4x (Fastest)', value: 0.2 },
];

function Visualizer() {
  const location = useLocation();
  const initialAlgorithm = location.state?.selectedAlgo || location.state?.algorithm || 'bubbleSort';

  // ---- New state for manual array input and timer ----
  const [manualInput, setManualInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [timer, setTimer] = useState(0);
  const timerIntervalRef = useRef(null);

  // ---- Existing state ----
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [sortingAlgorithm, setSortingAlgorithm] = useState(initialAlgorithm);
  const [speed, setSpeed] = useState(0.80); // default: 0.80 seconds/step
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const arrayRef = useRef([]);
  arrayRef.current = array;
  const sortingInterval = useRef(null);

  // ---- Sync selected algo if arriving from card link ----
  useEffect(() => {
    setSortingAlgorithm(initialAlgorithm);
  // eslint-disable-next-line
  }, [initialAlgorithm]);

  // ---- Timer logic tied to speed ----
  const startTimer = () => {
    if (timerIntervalRef.current) return;
    const intervalDuration = 50;
    const increment = (intervalDuration / 1000) / speed;
    timerIntervalRef.current = setInterval(() => {
      setTimer(prev => parseFloat((prev + increment).toFixed(2)));
    }, intervalDuration);
  };
  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };
  const resetTimer = () => {
    stopTimer();
    setTimer(0);
  };

  // ---- Array and input logic ----
  const generateRandomArray = (size) =>
    Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 20);

  const parseManualInput = () => {
    const elements = manualInput.trim().split(/\s{1,2}/);
    if (manualInput.trim() === "") return null;
    if (elements.length !== arraySize) {
      setInputError(`Enter exactly ${arraySize} numbers`);
      return null;
    }
    const nums = elements.map(Number);
    if (nums.some(x => isNaN(x) || x < 1 || x > 1000)) {
      setInputError("Numbers must be between 1 and 1000");
      return null;
    }
    setInputError("");
    return nums;
  };

  const resetArray = (size) => {
    if (isSorting) return;
    resetTimer();
    const parsed = parseManualInput();
    if (parsed) {
      setArray(parsed);
    } else if (!manualInput.trim()) {
      setArray(generateRandomArray(size));
      setInputError("");
    } else {
      setArray(Array(size).fill(0)); // Show empty bars when invalid
    }
    setActiveIndices([]);
  };

  // ---- Setup on mount & array size change ----
  useEffect(() => {
    resetArray(arraySize);
  // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!isSorting) {
      setManualInput("");
      setInputError("");
      resetArray(arraySize);
    }
  // eslint-disable-next-line
  }, [arraySize]);

  // ---- Sorting visualization ----
  const animateSort = (steps) => {
    if (steps.length === 0) {
      setIsSorting(false);
      setActiveIndices([]);
      stopTimer();
      return;
    }
    setIsSorting(true);
    let i = 0;
    sortingInterval.current = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(sortingInterval.current);
        setIsSorting(false);
        setActiveIndices([]);
        stopTimer();
        return;
      }
      const step = steps[i];
      const newArr = arrayRef.current.slice();
      switch (step.type) {
        case 'compare':
          setActiveIndices(step.indices);
          break;
        
        case 'swap':
          [newArr[step.indices[0]], newArr[step.indices[1]]] = [
            newArr[step.indices[1]],
            newArr[step.indices[0]],
          ];
          setArray(newArr);
          setActiveIndices(step.indices);
          break;

        case 'overwrite':
          newArr[step.index] = step.value;
          setArray(newArr);
          setActiveIndices([step.index]);
          break;
        case 'pivot':
        case 'count':
        case 'bucketInsert':
          setActiveIndices([step.index]);
          break;
        default:
          setActiveIndices([]);
          break;
      }
      i++;
    }, speed * 1000);
    startTimer(); // start timer right with animation
  };

  const startSort = () => {
    if (isSorting) return;
    const algorithmFunc = algorithmsMap[sortingAlgorithm];
    const steps = algorithmFunc(array);
    animateSort(steps);
  };
  const stopSort = () => {
    if (sortingInterval.current) {
      clearInterval(sortingInterval.current);
    }
    stopTimer();
    setIsSorting(false);
    setActiveIndices([]);
  };

  // ---- Render ----
  return (
    <div style={{ padding: '1rem', fontSize: '1.25rem' }}>
      <h2 style={{ color: '#00ffe7', fontSize: '2.2rem' }}>Sorting Visualizer</h2>
      <div style={{
        marginBottom: '1rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <label>
          Algorithm:&nbsp;
          <select
            value={sortingAlgorithm}
            onChange={(e) => {
              if (isSorting) return;
              setSortingAlgorithm(e.target.value);
              resetTimer();
            }}
            style={{ fontSize: '1.15rem' }}
          >
            {Object.keys(algorithmsMap).map((algo) => (
              <option key={algo} value={algo}>
                {algo}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: '2rem' }}>
          Array Size:&nbsp;
          <input
            type="range"
            min="5"
            max="20"
            value={arraySize}
            disabled={isSorting}
            onChange={(e) => setArraySize(Number(e.target.value))}
            style={{ verticalAlign: 'middle' }}
          />
          &nbsp;<span style={{ fontWeight: 700 }}>{arraySize}</span>
        </label>
        <label style={{ marginLeft: "2rem" }}>
          Array:&nbsp;
          <input
            type="text"
            placeholder="e.g., 10 50 7 25 ..."
            value={manualInput}
            disabled={isSorting}
            onChange={(e) => setManualInput(e.target.value)}
            style={{
              fontSize: "1.05rem",
              width: "170px",
              padding: "3px 8px",
              borderRadius: "8px",
              border: inputError ? "2px solid red" : "1px solid #333",
              outline: "none",
              background: "#181A1B",
              color: "#fff"
            }}
          />
        </label>
        <span style={{ color: "red", marginLeft: "8px", fontSize: "0.96rem" }}>
          {inputError}
        </span>
        <label style={{ marginLeft: '2rem' }}>
          Speed:&nbsp;
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            style={{ fontSize: '1.15rem' }}
          >
            {speedChoices.map((choice) => (
              <option key={choice.label} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        </label>
        <span style={{ marginLeft: '1rem', fontSize: '1rem' }}>
          Step time: {speed}s
        </span>
        <button
          onClick={() => resetArray(arraySize)}
          disabled={isSorting}
          style={{
            marginLeft: '2rem',
            fontSize: '1.1rem',
            padding: '0.5rem 2rem',
            borderRadius: '20px',
            border: 'none',
            background: 'linear-gradient(90deg,#00ffe7,#ff0080)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Reset Array
        </button>
        <button
          onClick={startSort}
          disabled={isSorting}
          style={{
            marginLeft: '1rem',
            fontSize: '1.1rem',
            padding: '0.5rem 2rem',
            borderRadius: '20px',
            border: 'none',
            background: 'linear-gradient(90deg, #ff0080,#00ffe7)',
            fontWeight: 600,
            cursor: 'pointer',
            minWidth: '120px',
            width: '100%',
            maxWidth: '180px',
            transition: 'background 0.3s ease',
          }}
        >
          Start Sorting
        </button>
        <button
          onClick={stopSort}
          disabled={!isSorting}
          style={{
            marginLeft: '1rem',
            fontSize: '1.1rem',
            padding: '0.5rem 2rem',
            borderRadius: '20px',
            border: 'none',
            background: 'linear-gradient(90deg, #ff4d4d, #d90000)',
            fontWeight: 600,
            cursor: isSorting ? 'pointer' : 'not-allowed',
            color: '#fff',
            minWidth: '120px',
            width: '100%',
            maxWidth: '180px',
            transition: 'background 0.3s ease',
          }}
        >
          Stop
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          height: '320px',
          border: '1px solid #333',
          borderRadius: '8px',
          backgroundColor: '#111',
          padding: '0.5rem',
          overflowX: 'auto'
        }}
      >
        {array.map((value, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              width: `${Math.max(22, Math.floor(800 / array.length))}px`,
              margin: '0 2px',
              height: "100%"
            }}
          >
            <span style={{
              color: "#fff",
              fontWeight: 500,
              fontSize: "1rem",
              marginBottom: "4px",
              textShadow: "0 1px 6px #222",
              userSelect: "none"
            }}>
              {value}
            </span>
            <div
              style={{
                width: "100%",
                height: `${value}px`,
                background: activeIndices.includes(idx)
                  ? 'linear-gradient(90deg, #ff0080, #00ffe7)'
                  : '#00ffe7',
                borderRadius: '3px',
                transition: 'height 0.3s, background 0.3s',
                boxShadow: activeIndices.includes(idx)
                  ? '0 0 24px #ff008088'
                  : 'none'
              }}
              title={value}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontWeight: 600,
          color: '#00ffe7',
          fontSize: '1.25rem',
          letterSpacing: '1px',
        }}
      >
        Sorting Time: {timer.toFixed(2)} s
      </div>
    </div>
  );
}
export default Visualizer;
