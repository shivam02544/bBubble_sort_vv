let randomArray = [];
function generateArray() {
  randomArray = [];
  for (let i = 0; i < 20; i++) {
    randomArray.push(Math.floor(Math.random() * 100) + 1);
    displayArr();
  }
}
function displayArr() {
  const arraycont = document.getElementById("arr-container");
  arraycont.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    const bar = document.createElement("div");
    bar.style.height = randomArray[i] + "px";
    bar.style.width = "10px";
    bar.style.margin = "2px";
    bar.style.backgroundColor = "blue";
    arraycont.appendChild(bar);
  }
}

async function bubblesort() {
  for (let i = 0; i < randomArray.length; i++) {
    for (let j = 0; j < randomArray.length - 1; j++) {
      if (randomArray[j] > randomArray[j + 1]) {
        let temp = randomArray[j];
        randomArray[j] = randomArray[j + 1];
        randomArray[j + 1] = temp;
        displayArr();
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
  }
}
