export function bucketSort(array) {
  const steps = [];
  const arr = array.slice();
  const n = arr.length;
  
  if (n <= 0) return steps;

  // Create buckets
  let bucketCount = Math.floor(Math.sqrt(n));
  let buckets = Array.from({ length: bucketCount }, () => []);

  // Find min and max
  let minValue = Math.min(...arr);
  let maxValue = Math.max(...arr);

  // Distribute elements into buckets
  for (let i = 0; i < n; i++) {
    let index = Math.floor(((arr[i] - minValue) / (maxValue - minValue + 1)) * bucketCount);
    steps.push({ type: 'bucketInsert', index: i, bucket: index });
    buckets[index].push(arr[i]);
  }

  // Sort individual buckets (using built-in sort here, can replace with insertionSort if desired)
  let sortedIndex = 0;
  for (let i = 0; i < bucketCount; i++) {
    buckets[i].sort((a, b) => a - b);
    for (let j = 0; j < buckets[i].length; j++) {
      steps.push({ type: 'overwrite', index: sortedIndex, value: buckets[i][j] });
      arr[sortedIndex] = buckets[i][j];
      sortedIndex++;
    }
  }

  return steps;
}
