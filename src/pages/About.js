import React from 'react';

function About() {
  return (
    <div style={{ padding: '2rem', color: '#f5f6fa', fontSize: '1.2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#00ffe7', fontSize: '2.8rem', marginBottom: '1rem' }}>About Sorting Visualizer</h1>

      <p>
        Welcome to the Sorting Visualizer project, a tool designed to help you understand how popular sorting algorithms work through dynamic visual animations.
      </p>

      <p>
        This project showcases algorithms such as Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Shell Sort, Radix Sort, and Bucket Sort.
        By visualizing the internal process of these algorithms, it aims to deepen your knowledge of sorting mechanics and algorithmic thinking.
      </p>

      <p>
        The project is built using React, with a sleek dark-themed interface focusing on clarity and interactive experience.
        You can choose your preferred algorithm, adjust the array size, and control the animation speed to explore sorting from different perspectives.
      </p>

      <h2 style={{ color: '#00ffe7', marginTop: '2rem' }}>About Me</h2>
      <p>
        This project is developed by Shivangi Prasad, a passionate developer interested in algorithms, data structures, and creating educational tools.
        Feel free to explore the GitHub repository for source code, contribute, or reach out for collaborations.
      </p>

      <h2 style={{ color: '#00ffe7', marginTop: '2rem' }}>Contact</h2>
      <p>
        You can connect with me on:
        <ul>
          <li><a href="https://github.com/shivz543" target="_blank" rel="noopener noreferrer" style={{ color: '#00ffe7' }}>GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/shivangi-prasad-31683324a/" target="_blank" rel="noopener noreferrer" style={{ color: '#00ffe7' }}>LinkedIn</a></li>
          <li><a href="mailto:shivangip.03r@gmail.com" style={{ color: '#00ffe7' }}>Email</a></li>
        </ul>
      </p>
    </div>
  );
}

export default About;
