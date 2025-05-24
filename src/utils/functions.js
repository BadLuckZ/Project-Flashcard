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
  localStorage.removeItem(deckName);
};

export const hasCardInDeck = (deckList, card) => {
  if (deckList.length == 0) return false;
  for (let i = 0; i < deckList.length; i++) {
    const c = deckList[i];
    if (isSameCard(c, card)) return true;
  }
  return false;
};

export const isSameCard = (card1, card2) => {
  return (
    card1.name.toLowerCase() == card2.name.toLowerCase() &&
    card1.type == card2.type
  );
};

export const shuffleDeck = (deck) => {
  let currentIndex = deck.length;
  let randomIndex = 0;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex],
      deck[currentIndex],
    ];
  }
  return deck;
};
