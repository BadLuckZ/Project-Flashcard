import { useState } from "react";
import { getCardNameFromDeck } from "../utils/functions";
import { wordTypes } from "../utils/constant";

export default function AddCardModal({ onClose, onAddCard, deckParam }) {
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardMeaning, setCardMeaning] = useState("");
  const [cardSentence, setCardSentence] = useState("");

  const [isCardNameError, setCardNameError] = useState(false);
  const [isCardTypeError, setCardTypeError] = useState(false);
  const [isCardMeaningError, setCardMeaningError] = useState(false);
  const [isCardSentenceError, setCardSentenceError] = useState(false);
  const [isCardError, setCardError] = useState(false);

  const cardNames = getCardNameFromDeck(deckParam);

  const handleCardName = (e) => {
    setCardNameError(false);
    setCardError(false);
    setCardName(e.target.value);
  };
  const handleCardType = (e) => {
    setCardTypeError(false);
    setCardType(e.target.value);
  };
  const handleCardMeaning = (e) => {
    setCardMeaningError(false);
    setCardMeaning(e.target.value);
  };
  const handleCardSentence = (e) => {
    setCardSentenceError(false);
    setCardSentence(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = cardName.trim();
    const trimmedType = cardType.trim();
    const trimmedMeaning = cardMeaning.trim();
    const trimmedSentence = cardSentence.trim();

    if (trimmedName === "") {
      setCardNameError(true);
      return;
    }

    if (trimmedType === "") {
      setCardTypeError(true);
      return;
    }

    if (trimmedMeaning === "") {
      setCardMeaningError(true);
      return;
    }

    if (trimmedSentence === "") {
      setCardSentenceError(true);
      return;
    }

    if (!cardNames.includes(trimmedName.toLowerCase())) {
      setCardError(false);
      setCardNameError(false);
      setCardTypeError(false);
      setCardMeaningError(false);
      setCardSentenceError(false);

      const newCard = {
        name:
          trimmedName.charAt(0).toUpperCase() +
          trimmedName.slice(1, trimmedName.length).toLowerCase(),
        type: trimmedType,
        meaning: trimmedMeaning,
        sentence: trimmedSentence,
      };
      onAddCard(newCard);
      onClose();
    } else {
      setCardError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm" />

      <div className="relative z-10 bg-white rounded-lg p-6 shadow-lg w-100 flex flex-col justify-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-medium">Add New Card</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={cardName}
            onChange={handleCardName}
            placeholder="Enter word"
            className={`w-full p-2 border rounded text-lg sm:text-xl ${
              isCardNameError ? "border-myred" : ""
            }`}
          />
          {isCardNameError && (
            <p className="text-lg text-myred text-center">Enter a word!!!</p>
          )}
          <select
            value={cardType}
            onChange={handleCardType}
            className={`w-full p-2 border rounded text-lg sm:text-xl ${
              isCardTypeError ? "border-myred" : ""
            }`}
          >
            <option value="" disabled hidden>
              Select type
            </option>
            {wordTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {isCardTypeError && (
            <p className="text-lg text-myred text-center">
              Select a word type!!!
            </p>
          )}
          <input
            type="text"
            value={cardMeaning}
            onChange={handleCardMeaning}
            placeholder="Enter meaning"
            className={`w-full p-2 border rounded text-lg sm:text-xl ${
              isCardMeaningError ? "border-myred" : ""
            }`}
          />
          {isCardMeaningError && (
            <p className="text-lg text-myred text-center">Enter a meaning!!!</p>
          )}
          <input
            type="text"
            value={cardSentence}
            onChange={handleCardSentence}
            placeholder="Enter sentence"
            className={`w-full p-2 border rounded text-lg sm:text-xl ${
              isCardSentenceError ? "border-myred" : ""
            }`}
          />
          {isCardSentenceError && (
            <p className="text-lg text-myred text-center">
              Enter a sentence!!!
            </p>
          )}
          {isCardError && (
            <p className="text-lg text-myred text-center">
              That word is already in the deck!!!
            </p>
          )}
          <div className="flex justify-end gap-2 flex-col-reverse sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-white cursor-pointer border text-lg sm:text-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border bg-mydarkgreen text-white rounded cursor-pointer text-lg sm:text-xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
