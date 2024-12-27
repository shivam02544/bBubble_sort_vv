let randomArray = [];
function generateArray() {
  randomArray = [];
  for (let i = 0; i < 20; i++) {
    randomArray.push(Math.floor(Math.random() * 100) + 1);
  }
  displayArr();
}
function displayArr() {
  const arraycont = document.getElementById("arr-container");
  arraycont.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    const bar = document.createElement("div");
    bar.style.height = randomArray[i] + "px";
    bar.style.width = "20px";
    bar.style.margin = "3px";
    arraycont.appendChild(bar);
    setTimeout(() => {
      bar.style.transform = "scaleY(1)";
    }, i * 50);
  }
}
async function swapAnimation(firstBar, secondBar) {
  return new Promise((resolve) => {
    const firstBarRect = firstBar.getBoundingClientRect();
    const secondBarRect = secondBar.getBoundingClientRect();
    const distance = secondBarRect.left - firstBarRect.left;

    // Initial highlight
    firstBar.style.background = "linear-gradient(to top, #ff416c, #ff4b2b)";
    secondBar.style.background = "linear-gradient(to top, #ff416c, #ff4b2b)";
    firstBar.style.transform = "scaleY(1.1)";
    secondBar.style.transform = "scaleY(1.1)";
    firstBar.style.boxShadow = "0 0 10px rgba(255, 65, 108, 0.5)";
    secondBar.style.boxShadow = "0 0 10px rgba(255, 65, 108, 0.5)";

    // Add sliding animation
    firstBar.style.transition = "all 0.3s ease-in-out";
    secondBar.style.transition = "all 0.3s ease-in-out";
    firstBar.style.transform += ` translateX(${distance}px)`;
    secondBar.style.transform += ` translateX(${-distance}px)`;

    setTimeout(() => {
      // Swap heights
      const tempHeight = firstBar.style.height;
      firstBar.style.height = secondBar.style.height;
      secondBar.style.height = tempHeight;

      // Reset positions instantly
      firstBar.style.transition = "none";
      secondBar.style.transition = "none";
      firstBar.style.transform = "scaleY(1.1)";
      secondBar.style.transform = "scaleY(1.1)";

      setTimeout(() => {
        // Restore smooth transitions
        firstBar.style.transition = "all 0.3s ease-in-out";
        secondBar.style.transition = "all 0.3s ease-in-out";

        // Reset to normal state
        firstBar.style.background = "linear-gradient(to top, #4481eb, #04befe)";
        secondBar.style.background =
          "linear-gradient(to top, #4481eb, #04befe)";
        firstBar.style.transform = "scaleY(1)";
        secondBar.style.transform = "scaleY(1)";
        firstBar.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
        secondBar.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
        resolve();
      }, 50);
    }, 400);
  });
}

async function sortedBarsColored() {
  const bars = document.getElementById("arr-container").children;
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.background = "linear-gradient(to top, #00b09b, #96c93d)";
    bars[i].style.transform = "scaleY(1.05)";
    bars[i].style.boxShadow = "0 0 12px rgba(0, 176, 155, 0.3)";

    await new Promise((resolve) => setTimeout(resolve, 40));

    setTimeout(() => {
      bars[i].style.transform = "scaleY(1)";
    }, 180);
  }
}

function disableButtons(disabled) {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => (button.disabled = disabled));
}

async function bubbleSort() {
  disableButtons(true);
  let swapped;

  do {
    swapped = false;
    const bars = document.getElementById("arr-container").children;

    for (let j = 0; j < randomArray.length - 1; j++) {
      if (randomArray[j] > randomArray[j + 1]) {
        // Swap in array
        let temp = randomArray[j];
        randomArray[j] = randomArray[j + 1];
        randomArray[j + 1] = temp;

        // Animate the swap
        await swapAnimation(bars[j], bars[j + 1]);
        swapped = true;
      }
    }
  } while (swapped);

  await sortedBarsColored();
  disableButtons(false);
}

async function selectionSort() {
  disableButtons(true);
  const bars = document.getElementById("arr-container").children;

  for (let i = 0; i < randomArray.length; i++) {
    let minIdx = i;

    for (let j = i + 1; j < randomArray.length; j++) {
      if (randomArray[j] < randomArray[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      let temp = randomArray[i];
      randomArray[i] = randomArray[minIdx];
      randomArray[minIdx] = temp;
      await swapAnimation(bars[i], bars[minIdx]);
    }
  }

  await sortedBarsColored();
  disableButtons(false);
}

async function insertionSort() {
  disableButtons(true);
  const bars = document.getElementById("arr-container").children;

  for (let i = 1; i < randomArray.length; i++) {
    let key = randomArray[i];
    let j = i - 1;

    while (j >= 0 && randomArray[j] > key) {
      randomArray[j + 1] = randomArray[j];
      await swapAnimation(bars[j], bars[j + 1]);
      j--;
    }
    randomArray[j + 1] = key;
  }

  await sortedBarsColored();
  disableButtons(false);
}

async function quickSort() {
  disableButtons(true);
  await quickSortHelper(0, randomArray.length - 1);
  await sortedBarsColored();
  disableButtons(false);
}

async function quickSortHelper(low, high) {
  if (low < high) {
    let pi = await partition(low, high);
    await quickSortHelper(low, pi - 1);
    await quickSortHelper(pi + 1, high);
  }
}

async function partition(low, high) {
  const bars = document.getElementById("arr-container").children;
  let pivot = randomArray[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (randomArray[j] < pivot) {
      i++;
      let temp = randomArray[i];
      randomArray[i] = randomArray[j];
      randomArray[j] = temp;
      await swapAnimation(bars[i], bars[j]);
    }
  }

  let temp = randomArray[i + 1];
  randomArray[i + 1] = randomArray[high];
  randomArray[high] = temp;
  await swapAnimation(bars[i + 1], bars[high]);

  return i + 1;
}

async function mergeSort() {
  disableButtons(true);
  await mergeSortHelper(0, randomArray.length - 1);
  await sortedBarsColored();
  disableButtons(false);
}

async function mergeSortHelper(start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);
    await merge(start, mid, end);
  }
}

async function merge(start, mid, end) {
  const bars = document.getElementById("arr-container").children;
  const leftArray = randomArray.slice(start, mid + 1);
  const rightArray = randomArray.slice(mid + 1, end + 1);

  let i = 0,
    j = 0,
    k = start;

  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      randomArray[k] = leftArray[i];
      if (k !== start + i) {
        bars[k].style.height = `${leftArray[i]}px`;
        await highlightBar(bars[k]);
      }
      i++;
    } else {
      randomArray[k] = rightArray[j];
      bars[k].style.height = `${rightArray[j]}px`;
      await highlightBar(bars[k]);
      j++;
    }
    k++;
  }

  while (i < leftArray.length) {
    randomArray[k] = leftArray[i];
    if (k !== start + i) {
      bars[k].style.height = `${leftArray[i]}px`;
      await highlightBar(bars[k]);
    }
    i++;
    k++;
  }

  while (j < rightArray.length) {
    randomArray[k] = rightArray[j];
    bars[k].style.height = `${rightArray[j]}px`;
    await highlightBar(bars[k]);
    j++;
    k++;
  }
}

async function heapSort() {
  disableButtons(true);
  const n = randomArray.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    await swapAnimation(
      document.getElementById("arr-container").children[0],
      document.getElementById("arr-container").children[i]
    );
    [randomArray[0], randomArray[i]] = [randomArray[i], randomArray[0]];
    await heapify(i, 0);
  }

  await sortedBarsColored();
  disableButtons(false);
}

async function heapify(n, i) {
  const bars = document.getElementById("arr-container").children;
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && randomArray[left] > randomArray[largest]) {
    largest = left;
  }

  if (right < n && randomArray[right] > randomArray[largest]) {
    largest = right;
  }

  if (largest !== i) {
    await swapAnimation(bars[i], bars[largest]);
    [randomArray[i], randomArray[largest]] = [
      randomArray[largest],
      randomArray[i],
    ];
    await heapify(n, largest);
  }
}

async function highlightBar(bar) {
  return new Promise((resolve) => {
    bar.style.background = "linear-gradient(to top, #ff416c, #ff4b2b)";
    bar.style.transform = "scaleY(1.1)";

    setTimeout(() => {
      bar.style.background = "linear-gradient(to top, #4481eb, #04befe)";
      bar.style.transform = "scaleY(1)";
      resolve();
    }, 50);
  });
}
