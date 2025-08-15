export function mergeSort(array) {
  const steps = [];
  const arr = array.slice();

  function merge(left, mid, right) {
    let temp = [];
    let i = left,
      j = mid + 1;

    while (i <= mid && j <= right) {
      steps.push({ type: 'compare', indices: [i, j] });
      if (arr[i] <= arr[j]) {
        temp.push(arr[i]);
        i++;
      } else {
        temp.push(arr[j]);
        j++;
      }
    }

    while (i <= mid) {
      temp.push(arr[i]);
      i++;
    }

    while (j <= right) {
      temp.push(arr[j]);
      j++;
    }

    // Overwrite original arr and record steps
    for (let k = left; k <= right; k++) {
      steps.push({ type: 'overwrite', index: k, value: temp[k - left] });
      arr[k] = temp[k - left];
    }
  }

  function mergeSortHelper(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    mergeSortHelper(left, mid);
    mergeSortHelper(mid + 1, right);
    merge(left, mid, right);
  }

  mergeSortHelper(0, arr.length - 1);
  return steps;
}
