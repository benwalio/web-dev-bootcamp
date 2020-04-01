var numOfColors = 6;
var colors = generateRandomColors(numOfColors);
var squares = document.querySelectorAll(".square");
var pickedColor = pickWinColor();
var rgbHint = document.querySelector(".rgb-hint");
var messageDisplay = document.querySelector(".info-alert");
var resetButton = document.querySelector("#new-color-set");
var easyButton = document.querySelector("#easy-btn");
var hardButton = document.querySelector("#hard-btn");
rgbHint.textContent = pickedColor;

easyButton.addEventListener("click", function() {
  numOfColors = 3;
  easyButton.classList.add("selected");
  hardButton.classList.remove("selected");
  setColors(numOfColors);
});

hardButton.addEventListener("click", function() {
  numOfColors = 6;
  hardButton.classList.add("selected");
  easyButton.classList.remove("selected");
  setColors(numOfColors);
});

resetButton.addEventListener("click", function() {
  resetButton.innerText = "new colors";
  messageDisplay.innerText = "";
  colors = generateRandomColors(numOfColors);
  pickedColor = pickWinColor();
  rgbHint.textContent = pickedColor;

  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
  document.querySelector("header").style.backgroundColor = "#191970";
});

function setColors (num) {
  colors = generateRandomColors(num);
  pickedColor = pickWinColor();
  rgbHint.textContent = pickedColor;

  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }

  for (let i = num; i < squares.length; i++) {
    squares[i].style.backgroundColor = "#232323";
  }
  document.querySelector("header").style.backgroundColor = "#191970";
};

for (let i = 0; i < squares.length; i++) {

  squares[i].style.backgroundColor = colors[i];

  // add listener to square
  squares[i].addEventListener("click", function() {
    console.log("clicked " + this.style.backgroundColor);
    clickedColor = this.style.backgroundColor;
    if (clickedColor === pickedColor) {
      // console.log("winner winner");
      messageDisplay.classList.remove("invisible");
      messageDisplay.innerText = "winner winner!";
      changeColors(clickedColor);
    } else {
      // console.log("try to stop sucking");
      this.style.backgroundColor = "#232323";
      messageDisplay.classList.remove("invisible");
      messageDisplay.innerText = "try again"
    }
  });
}

function changeColors (color) {
  resetButton.innerText = "play again?";
  for (let i = 0; i < numOfColors; i++) {
    squares[i].style.backgroundColor = color;
  }
  document.querySelector("header").style.backgroundColor = color;
}

function pickWinColor() {
  let randColor = Math.floor(Math.random() * colors.length);
  return colors[randColor];
}

function generateRandomColors(num) {
  var array = [];
  for (let i = 0; i < num; i++) {
    var colorBuildArray = [];
    for (let j = 0; j < 3; j++) {
      colorBuildArray[j] = Math.ceil(Math.random() * 255);
      // console.log(colorBuildArray[];
    }
    array[i] = buildColorString(colorBuildArray);
  }
  return array;
}

function buildColorString (colorArray) {
  var rgbString = "rgb("
  for (let i = 0; i < colorArray.length; i++) {
    rgbString = rgbString + colorArray[i];
    if (i < colorArray.length - 1) {
      rgbString = rgbString + ", ";
    }
  }
  rgbString = rgbString + ")";
  // console.log(rgbString);
  return rgbString;
}
