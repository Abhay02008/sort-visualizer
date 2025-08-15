export function radixSort(array) {
  const steps = [];
  const arr = array.slice();
  const maxNum = Math.max(...arr);
  let exp = 1;

  while (Math.floor(maxNum / exp) > 0) {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);

    // Counting occurrences
    for (let i = 0; i < arr.length; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
      steps.push({ type: 'count', index: i, digit });
    }

    // Transform count to positions
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      steps.push({ type: 'overwrite', index: count[digit] - 1, value: arr[i] });
      count[digit]--;
    }

    // Copy to original array
    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      steps.push({ type: 'overwrite', index: i, value: arr[i] });
    }

    exp *= 10;
  }

  return steps;
}
