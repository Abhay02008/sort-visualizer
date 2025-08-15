export function shellSort(array) {
  const steps = [];
  const arr = array.slice();
  const n = arr.length;

  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j = i;

      steps.push({ type: 'compare', indices: [j - gap, j] });

      while (j >= gap && arr[j - gap] > temp) {
        steps.push({ type: 'overwrite', index: j, value: arr[j - gap] });
        arr[j] = arr[j - gap];
        j -= gap;
        if (j >= gap) steps.push({ type: 'compare', indices: [j - gap, j] });
      }
      steps.push({ type: 'overwrite', index: j, value: temp });
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }

  return steps;
}
