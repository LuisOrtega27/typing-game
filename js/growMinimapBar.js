export function growMinimapBar(MINIMAP, listLength, gameLevel) {
  let parentHeight = MINIMAP.clientHeight;
  let barElement = MINIMAP.childNodes[1];

  let currentLevelIndicator = MINIMAP.childNodes[gameLevel + 3];

  if (gameLevel == listLength) return;

  currentLevelIndicator.style.setProperty("border-color", "#fff");
  currentLevelIndicator.style.setProperty("color", "#fff");

  let result = parentHeight / listLength;

  barElement.style.setProperty(
    "height",
    `${barElement.clientHeight + result}px`
  );
}
