"use strict";

import { growMinimapBar } from "./growMinimapBar.js";
import { minimap } from "./minimap.js";
import { setScoreResume } from "./setScoreResume.js";

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
  "Erre con erre, guitarra; erre con erre, carril. Rapido ruedan los carros, cargados de azucar, del ferrocarril",
  "Escribe este texto",
  "Mi mama me mima",
  "Tres tristes tigres tragaban trigo en un trigal",
];
let targetSentence = 0;

// MINIMAP
const MINIMAP_ELEMENT = document.querySelector(".minimap");
let gameLevel = 0;

// TARGET SENTENCE
const backWord = document.querySelector(".typingGame__backWord");
let currentSentence = "";

// USER INPUT
const forntWord = document.querySelector(".typingGame__frontWord");
let userSentence = "";

// SCORE RESUME
const SCORE_RESUME = document.querySelector(".scoreResume");

// USER SCORE
let userScore = 0.0;
let userAccuracy = 0;
let userAccuracyByLevel = [];

// BONUS BAR
const GAME_BONUS_BAR = document.querySelector(".typingGame__bar");
let gameBonusBarInterval = null;
let gameBonus = 0;
let isBonus = false;
let GameScoreBarGrowRate = 5;
let GameScoreBarChangeRate = 150;

// ACCURACY
const GAME_ACCURACY_SCORE = document.querySelector(
  ".typingGame__accuracyArea__score"
);

// TIMER
const GAME_TIMER = document.querySelector(".typingGame__timerArea__time");
let gameTimeInterval = null;
let seconds = 1;
let minuts = 0;
let gameTimer = "";

// JUST FOR THE FISRT INPUT
let isGameJustStarted = true;

//

//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Variables ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//
//
//
// ================================== SET TIMER ==============================
function setGameTimer() {
  gameTimeInterval = setInterval(() => {
    if (seconds > 59) {
      seconds = 0;
      minuts += 1;
    }

    gameTimer = `${minuts < 10 ? "0" + minuts : minuts}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;

    GAME_TIMER.textContent = gameTimer;

    seconds += 1;

    if (gameTimer == "10:00") clearInterval(gameTimeInterval);
  }, 1000);

  // console.log(gameTimer);
}

// ================================== SET BONUS BAR ==========================
function setBonusBar() {
  gameBonusBarInterval = setInterval(() => {
    isBonus ? (gameBonus += GameScoreBarGrowRate) : (gameBonus -= 1);
    isBonus = false;

    // GIVE BONUS TO USER
    if (gameBonus > 75) {
      userScore += 2;
    } else if (gameBonus > 50 || gameBonus < 75) {
      userScore += 1.5;
    } else if (gameBonus > 25 || gameBonus < 50) {
      userScore += 1;
    } else {
      userScore += 0.5;
    }

    // LIMIT BONUS BAR MIN & MAX
    if (gameBonus <= 0) {
      gameBonus = 0;
    } else if (gameBonus > 100) {
      gameBonus = 100;
    } else {
      gameBonus;
    }
    GAME_BONUS_BAR.style.setProperty("width", `${gameBonus}%`);
  }, GameScoreBarChangeRate);
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

// ================================== SHOOSE SENTENSE ========================
function selectSentence() {
  let sentence = SENTENCE_LISTE[targetSentence];
  setBackSentence(sentence);

  if (targetSentence < SENTENCE_LISTE.length) targetSentence++;
}

// ================================== LOAD GAME ==============================
window.addEventListener("DOMContentLoaded", () => {
  selectSentence();
  minimap(MINIMAP_ELEMENT, SENTENCE_LISTE.length);
});

// ================================== SET ACCURACY ===========================
function setAccuracy() {
  let accuracy;
  if (userAccuracy.length == 4) {
    accuracy = `00${userAccuracy}`;
  } else if (userAccuracy.length == 5) {
    accuracy = `0${userAccuracy}`;
  } else {
    accuracy = userAccuracy;
  }

  //   No pense muy bien esta parte
  let percentageContainer = GAME_ACCURACY_SCORE.parentElement.parentElement;

  if (accuracy > 75) {
    percentageContainer.className = "typingGame__accuracyArea green";
  } else if (accuracy > 50 && accuracy > 74) {
    percentageContainer.className = "typingGame__accuracyArea yellow";
  } else if (accuracy > 25 && accuracy > 49) {
    percentageContainer.className = "typingGame__accuracyArea orange";
  } else {
    percentageContainer.className = "typingGame__accuracyArea red";
  }

  GAME_ACCURACY_SCORE.textContent = accuracy;
}

// ================================== CLEAR GAME =============================
function clearGame() {
  userSentence = "";
  forntWord.textContent = "";
  userAccuracy = 0;
  GAME_ACCURACY_SCORE.parentElement.parentElement.className =
    "typingGame__accuracyArea";
  GAME_ACCURACY_SCORE.textContent = "000.00";
}

// ================================== END GAME ===============================
function finishGame() {
  setScoreResume(
    SCORE_RESUME,
    userScore,
    userAccuracy,
    userAccuracyByLevel,
    gameTimer
  );

  window.removeEventListener("keydown", handleKeyboard);

  clearInterval(gameTimeInterval);

  backWord.textContent = "";
  forntWord.textContent = "GAME FINISHED!! :D";
}

// ================================== NEXT LEVEL =============================
function AdvanceToNextLevel() {
  growMinimapBar(MINIMAP_ELEMENT, SENTENCE_LISTE.length, gameLevel);

  if (gameLevel == SENTENCE_LISTE.length - 1) return finishGame();

  setScoreResume(
    SCORE_RESUME,
    userScore,
    userAccuracy,
    userAccuracyByLevel,
    gameTimer
  );
  clearGame();
  selectSentence();
  gameLevel += 1;
}

// ================================== VERIFY ACCURACY ========================
function verifyAccuracy() {
  if (
    currentSentence != undefined &&
    userSentence.length == currentSentence.length
  ) {
    return AdvanceToNextLevel();
  }

  if (currentSentence == undefined) return;

  let count = 0;
  Array.from(userSentence).map((letter, index) => {
    if (letter == currentSentence[index]) {
      count++;
      userScore += 0.3;
      isBonus = true;
    } else {
      isBonus = false;
    }
  });

  userAccuracy = ((count * 100) / userSentence.length).toFixed(2);

  setAccuracy();
}

// ================================== DETECT KEYBOARD ========================
function handleKeyboard(event) {
  const { key } = event;

  if (ABC.includes(key.toLowerCase()) || ABC_SPECIALS.includes(key)) {
    setFrontSentence(key);
  }

  // No supe como hacer de otra manera que se ejecutase una sola vez al iniciar el juego jajaja
  if (isGameJustStarted) {
    setBonusBar();
    setGameTimer();
    isGameJustStarted = false;
  }
}
window.addEventListener("keydown", handleKeyboard);
