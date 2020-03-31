var pOneScore = document.querySelector("#p1-score");
var pTwoScore = document.querySelector("#p2-score");
var playToScore = document.querySelector("#playing-to");
var resetButton = document.querySelector("#reset");
var pOneButton = document.querySelector("#p1-scores");
var pTwoButton = document.querySelector("#p2-scores");
var gameOver = false;


function incrementScore (score) {
  console.log(score);
  score++;
}

console.log(pOneScore.innerText);

function checkGameStatus(pOneScore, pTwoScore, playToScore) {
  if (pOneScore === playToScore || pTwoScore === playToScore) {
    gameOver = true;
    if (pOneScore > pTwoScore) {
      pOneScore.classList.add("winner")
    } else {
      pTwoScore.classList.add("winner")
    }
  }
}

pOneButton.addEventListener("click", function() {
  if (!gameOver) {
    pOneScore.innerText++;
  }
  if (pOneScore.innerText == playToScore.valueAsNumber) {
    gameOver = true;
    pOneScore.classList.add("winner");
  }
});

pTwoButton.addEventListener("click", function() {
  if (!gameOver) {
    pTwoScore.innerText++;
  }
  if (pTwoScore.innerText == playToScore.valueAsNumber) {
    gameOver = true;
    pTwoScore.classList.add("winner");
  }
});

reset.addEventListener("click", function () {
  pOneScore.innerText = "0";
  pOneScore.classList.remove("winner");
  pTwoScore.innerText = "0";
  pTwoScore.classList.remove("winner");
  gameOver = false;
})
