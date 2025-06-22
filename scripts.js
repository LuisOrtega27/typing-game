"use strict";

const ABC = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "ñ",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const ABC_SPECIALS = [" ", ".", ":", ",", ";", '"', "-", "_", "!", "?"];

const SENTENCE_LISTE = [
  "Mucho texto",
  "muchisimo texto",
  "lo que sea",
  "consequuntur velit est eaque? Tenetur, sunt!",
  "velit Tenetur, sunt!",
  "est eaque? Tenetur!",
  "me quede sin ideas",
];

// TARGET SENTENCE
const backWord = document.querySelector(".typingGame__backWord");
let currentSentence = "";

// USER INPUT
const forntWord = document.querySelector(".typingGame__frontWord");
let userSentence = "";

// BONUS BAR
const GAME_BONUS_BAR = document.querySelector(".typingGame__bar");
let gameBonusBarInterval = null;
let gameBonus = 100;
let isBonus = false;

// ACCURACY
const GAME_ACCURACY_SCORE = document.querySelector(
  ".typingGame__accuracyArea__score"
);
let gameAccuracy = 0;

// TIMER
const GAME_TIMER = document.querySelector(".typingGame__timerArea__time");
let gameTimeInterval = null;
let seconds = 1;
let minuts = 0;

// JUST FOR THE FISRT INPUT
let isGameJustStarted = true;

//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Variables ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//
//
//
// ================================== SET TIMER ==============================
function setGameTimer() {
  if (seconds > 59) {
    seconds = 0;
    minuts += 1;
  }

  let timer = `${minuts < 10 ? "0" + minuts : minuts}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;

  GAME_TIMER.textContent = timer;

  seconds += 1;

  //   console.log(timer == "10:00", timer);

  if (timer == "10:00") clearInterval(gameTimeInterval);
}

// ================================== SET BONUS BAR ==========================
function setBonusBar() {
  gameBonusBarInterval = setInterval(() => {
    isBonus ? (gameBonus += 2) : (gameBonus -= 1);
    isBonus = false;

    GAME_BONUS_BAR.style.setProperty(
      "width",
      `${gameBonus >= 100 ? 100 : gameBonus}%`
    );

    if (gameBonus == 0) clearInterval(gameBonusBarInterval);
  }, 200);
}

// ================================== SET BACKGROUND SENTENSE ================
function setBackSentence(sentence) {
  backWord.textContent = sentence;
  currentSentence = sentence;
}

// ================================== SET FRONT SENTENSE =====================
function setFrontSentence(key) {
  userSentence += key;
  forntWord.textContent = userSentence;

  verifyAccuracy();
}

// ================================== SHOOSE RANDOM SENTENSE =================
function selectRandomSentence() {
  let randomNumber = Math.floor(Math.random() * SENTENCE_LISTE.length);

  let sentence = SENTENCE_LISTE[randomNumber];

  //   console.log(randomNumber, sentence);

  setBackSentence(sentence);
}

// ================================== START GAME =============================
window.addEventListener("DOMContentLoaded", () => {
  gameTimeInterval = setInterval(setGameTimer, 1000);
  selectRandomSentence();
});

// ================================== SET ACCURACY =============================++++
function setAccuracy() {
  let accuracy;
  if (gameAccuracy.length == 4) {
    accuracy = `00${gameAccuracy}`;
  } else if (gameAccuracy.length == 5) {
    accuracy = `0${gameAccuracy}`;
  } else {
    accuracy = gameAccuracy;
  }

  //   No pense muy bien esta parte
  let percentageContainer = GAME_ACCURACY_SCORE.parentElement.parentElement;

  if (accuracy > 75)
    percentageContainer.className = "typingGame__accuracyArea green";
  //
  else if (accuracy > 50 && accuracy > 74)
    percentageContainer.className = "typingGame__accuracyArea yellow";
  //
  else if (accuracy > 25 && accuracy > 49)
    percentageContainer.className = "typingGame__accuracyArea orange";
  //
  else percentageContainer.className = "typingGame__accuracyArea red";

  GAME_ACCURACY_SCORE.textContent = accuracy;
}

// ================================== VERIFY ACCURACY =============================
function verifyAccuracy() {
  let count = 0;

  Array.from(userSentence).map((letter, index) => {
    if (letter == currentSentence[index]) {
      count++;
      isBonus = true;
    } else {
      isBonus = false;
    }
  });

  gameAccuracy = ((count * 100) / userSentence.length).toFixed(2);
  setAccuracy();
}

// ================================== DETECT KEYBOARD ========================
window.addEventListener("keydown", (event) => {
  const { key } = event;

  if (ABC.includes(key.toLowerCase()) || ABC_SPECIALS.includes(key)) {
    setFrontSentence(key);
  }

  // No supe como hacer de otra manera que se ejecutase una sola vez al iniciar el juego jajaja
  if (isGameJustStarted) {
    setBonusBar();
    isGameJustStarted = false;
  }
});
