export const loadDeckList = () => {
  if (localStorage.getItem("deckList")) {
    return JSON.parse(localStorage.getItem("deckList"));
  } else {
    return [];
  }
};

export const updateDeckList = (deckList) => {
  localStorage.setItem("deckList", JSON.stringify(deckList));
};
