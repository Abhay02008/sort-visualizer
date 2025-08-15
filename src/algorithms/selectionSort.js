export function selectionSort(array) {
  const steps = [];
  const arr = array.slice();
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({ type: 'compare', indices: [j, minIdx] });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      steps.push({ type: 'swap', indices: [i, minIdx] });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }

  return steps;
}
