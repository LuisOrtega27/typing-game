export function minimap(MINIMAP_ELEMENT, listLength) {
  for (let i = 0; i < listLength; i++) {
    const LEVEL_INDICATOR = document.createElement("DIV");

    LEVEL_INDICATOR.className = "level__indicator";
    LEVEL_INDICATOR.textContent = i + 1;

    MINIMAP_ELEMENT.appendChild(LEVEL_INDICATOR);
  }
}
