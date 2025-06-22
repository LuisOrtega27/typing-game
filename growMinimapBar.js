export function growMinimapBar(MINIMAP, count, gameLevel) {
  let parentHeight = MINIMAP.clientHeight;
  let barElement = MINIMAP.childNodes[1];

  if (gameLevel == count) return;

  let currentLevelIndicator = MINIMAP.childNodes[gameLevel + 3];

  currentLevelIndicator.style.setProperty("border-color", "#fff");
  currentLevelIndicator.style.setProperty("color", "#fff");

  let result = parentHeight / count;

  barElement.style.setProperty(
    "height",
    `${barElement.clientHeight + result}px`
  );
}
