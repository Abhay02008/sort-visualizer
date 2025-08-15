export function quickSort(array) {
  const steps = [];
  const arr = array.slice();

  function partition(low, high) {
    let pivot = arr[high];
    steps.push({ type: 'pivot', index: high });

    let i = low;

    for (let j = low; j < high; j++) {
      steps.push({ type: 'compare', indices: [j, high] });
      if (arr[j] <= pivot) {
        if (i !== j) {
          steps.push({ type: 'swap', indices: [i, j] });
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        i++;
      }
    }
    steps.push({ type: 'swap', indices: [i, high] });
    [arr[i], arr[high]] = [arr[high], arr[i]];

    return i;
  }

  function quickSortHelper(low, high) {
    if (low < high) {
      let pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  quickSortHelper(0, arr.length - 1);
  return steps;
}
