"use strict";

//Selecting elements
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");
const image = document.querySelector(".dice");
const btnNewGame = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Starting conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
image.classList.add("hidden");
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isGameOver = false;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (activePlayer === 0) {
    activePlayer++;
  } else {
    activePlayer--;
  }
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (!isGameOver) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    image.setAttribute("src", `/images/dice-${String(dice)}.png`);
    image.classList.remove("hidden");

    //3. Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player and reset current score

      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (!isGameOver) {
    //1. score = current score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score >= 100 & finish game
    // if <100 switchPlayer

    if (scores[activePlayer] >= 100) {
      isGameOver = true;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      image.classList.toggle("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener("click", function () {
  isGameOver = false;
  currentScore = 0;
  image.classList.add("hidden");
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  activePlayer = 0;
  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--active");
});
