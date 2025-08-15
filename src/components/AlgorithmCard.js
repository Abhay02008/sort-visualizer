import React from 'react';
import { useNavigate } from 'react-router-dom';

function AlgorithmCard({ name, desc }) {
  const navigate = useNavigate();

  const handleExplore = () => {
    // Convert name to lowercase camelCase key to match your algorithm functions
    const algoKey = name.replace(/\s+/g, '').toLowerCase();
    navigate('/visualizer', { state: { algorithm: algoKey } });
  };

  return (
    <div
      className="feature-card"
      style={{
        minWidth: '210px',
        margin: '1rem',
        padding: '1rem',
        background: '#232526',
        color: '#00ffe7',
        borderRadius: '12px',
        boxShadow: '0 4px 16px #1117',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onClick={handleExplore}
      title={`Explore ${name}`}
    >
      <h4>{name}</h4>
      <p style={{ color: '#efeefe', flexGrow: 1 }}>{desc}</p>
      <button
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          border: 'none',
          background: 'linear-gradient(90deg, #00ffe7, #ff0080)',
          color: '#232526',
          fontWeight: '600',
          cursor: 'pointer',
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleExplore();
        }}
      >
        Explore
      </button>
    </div>
  );
}

export default AlgorithmCard;
