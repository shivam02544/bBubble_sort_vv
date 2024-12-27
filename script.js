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

async function bubblesort() {
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
