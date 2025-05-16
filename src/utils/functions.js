export default function loadDeckList() {
  if (localStorage.getItem("deckList")) {
    return JSON.parse(localStorage.getItem("deckList"));
  } else {
    return [];
  }
}
