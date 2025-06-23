export function setScoreResume(
  SCORE_RESUME,
  userScore,
  userAccuracy,
  userAccuracyByLevel,
  gameTimer
) {
  let scoreElement = SCORE_RESUME.childNodes[3];
  let averageElement = SCORE_RESUME.childNodes[5];
  let timerElement = SCORE_RESUME.childNodes[7];

  userAccuracyByLevel.push(parseFloat(userAccuracy));

  let result = userAccuracyByLevel.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  let average = result / userAccuracyByLevel.length;

  scoreElement.classList.add("animateScore");
  setTimeout(() => {
    scoreElement.classList.remove("animateScore");
  }, 1000);

  scoreElement.textContent = userScore.toFixed(2);

  averageElement.childNodes[1].textContent = average.toFixed(2);

  timerElement.childNodes[1].textContent = gameTimer;
}
