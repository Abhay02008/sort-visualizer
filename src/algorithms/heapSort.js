export function heapSort(array) {
  const steps = [];
  const arr = array.slice();
  const n = arr.length;

  function heapify(size, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      steps.push({ type: 'compare', indices: [left, largest] });
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      steps.push({ type: 'compare', indices: [right, largest] });
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== root) {
      steps.push({ type: 'swap', indices: [root, largest] });
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      heapify(size, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    steps.push({ type: 'swap', indices: [0, i] });
    [arr[0], arr[i]] = [arr[i], arr];
    heapify(i, 0);
  }

  return steps;
}
