export function insertionSort(array) {
  const steps = [];
  const arr = array.slice();
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    steps.push({ type: 'compare', indices: [j, i] });

    while (j >= 0 && arr[j] > key) {
      steps.push({ type: 'overwrite', index: j + 1, value: arr[j] });
      arr[j + 1] = arr[j];
      j--;
      if (j >= 0) steps.push({ type: 'compare', indices: [j, i] });
    }
    steps.push({ type: 'overwrite', index: j + 1, value: key });
    arr[j + 1] = key;
  }

  return steps;
}
