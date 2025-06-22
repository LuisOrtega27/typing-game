export function minimap(MINIMAP_ELEMENT, listLength) {
  for (let i = 1; i < listLength; i++) {
    const LEVEL_INDICATOR = document.createElement("DIV");

    LEVEL_INDICATOR.className = "level__indicator";
    LEVEL_INDICATOR.textContent = i;

    MINIMAP_ELEMENT.appendChild(LEVEL_INDICATOR);
  }
}
