export const loadDeckList = () => {
  if (localStorage.getItem("deckList")) {
    return JSON.parse(localStorage.getItem("deckList"));
  } else {
    return [];
  }
};

export const loadDeck = (deckName) => {
  if (localStorage.getItem(deckName)) {
    return JSON.parse(localStorage.getItem(deckName));
  } else {
    return [];
  }
};

export const updateDeckList = (deckList) => {
  localStorage.setItem("deckList", JSON.stringify(deckList));
};

export const updateDeck = (deckName, cardList) => {
  localStorage.setItem(deckName, JSON.stringify(cardList));
};

export const addDecktoList = (deckName) => {
  updateDeck(deckName, []);
};

export const removeDeckFromList = (deckName) => {
  updateDeck(deckName, []);
};

export const getCardNameFromDeck = (deckName) => {
  const names = [];
  const targetDeck = loadDeck(deckName);
  for (let card of targetDeck) {
    names.push(card.name.toLowerCase());
  }
  return names;
};
