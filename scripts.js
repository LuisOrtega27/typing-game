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
const ABC_SPECIALS = [".", ":", ",", ";", '"', "-", "_", "!", "?", " "];

const SENTENCE_LISTE = [
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat nisi unde voluptas temporibus, molestias reiciendis sit consequuntur velit fuga iusto molestiae sed corporis maiores asperiores labore est eaque? Tenetur, sunt!",
  "ipsum dolor sit,  adipisicing elit. Placeat  unde voluptas temporibus, sit consequuntur velit fuga iusto molestiae labore est eaque? Tenetur, sunt!",
  "dolor sit, amet consectetur adipisicing temporibus, molestias reiciendis sit consequuntur velit maiores asperiores labore, sunt!",
  "consequuntur velit est eaque? Tenetur, sunt!",
];

let currentSentence = "";
let userSentence = "";

const forntWord = document.querySelector(".typingGame__frontWord");
const backWord = document.querySelector(".typingGame__backWord");
const GAME_TIMER = document.querySelector(".typingGame__scoreArea__time");

let gameTimeInterval = null;
let seconds = 0;
let minuts = 0;

//  ================================= Variables ==============================

// ================================== TIMER ==================================
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

  console.log(timer == "10:00", timer);

  if (timer == "10:00") clearInterval(gameTimeInterval);
}

// ================================== SET BACKGROUND SENTENSE ================
function setBackSentence(sentence) {
  backWord.textContent = sentence;
}

// ================================== SHOOSE RANDOM SENTENSE =================
function selectRandomSentence() {
  const sentence =
    SENTENCE_LISTE[Math.floor(Math.random() * SENTENCE_LISTE.length)];

  setBackSentence(sentence);
}

// ================================== START GAME =============================
window.addEventListener("DOMContentLoaded", () => {
  gameTimeInterval = setInterval(setGameTimer, 1000);

  selectRandomSentence();
});

// ================================== SET FRONT SENTENSE =====================
function setFrontSentence(key) {
  userSentence += key;
  forntWord.textContent = userSentence;
}

// ================================== DETECT KEYBOARD ========================
window.addEventListener("keydown", (event) => {
  const { key } = event;

  if (ABC.includes(key.toLowerCase()) || ABC_SPECIALS.includes(key)) {
    setFrontSentence(key);
  }
});
