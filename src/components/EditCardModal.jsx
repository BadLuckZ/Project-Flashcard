import { useState } from "react";
import { wordTypes } from "../utils/constant";
import { getCardNameFromDeck } from "../utils/functions";

export default function EditCardModal({
  onClose,
  previousCard,
  onEditCard,
  deckParam,
}) {
  const [isNewCardNameError, setNewCardNameError] = useState(false);
  const [isNewCardMeaningError, setNewCardMeaningError] = useState(false);
  const [isNewCardSentenceError, setNewCardSentenceError] = useState(false);

  const [newCardName, setNewCardName] = useState(previousCard.name);
  const [newCardType, setNewCardType] = useState(previousCard.type);
  const [newCardMeaning, setNewCardMeaning] = useState(previousCard.meaning);
  const [newCardSentence, setNewCardSentence] = useState(previousCard.sentence);

  const cardNames = getCardNameFromDeck(deckParam);

  const handleCardName = (e) => {
    e.preventDefault();
    setNewCardNameError(false);
    setNewCardName(e.target.value);
  };

  const handleCardType = (e) => {
    e.preventDefault();
    setNewCardType(e.target.value);
  };

  const handleCardMeaning = (e) => {
    e.preventDefault();
    setNewCardMeaningError(false);
    setNewCardMeaning(e.target.value);
  };

  const handleCardSentence = (e) => {
    e.preventDefault();
    setNewCardSentenceError(false);
    setNewCardSentence(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const trimmedName = newCardName.trim();
    const trimmedType = newCardType.trim();
    const trimmedMeaning = newCardMeaning.trim();
    const trimmedSentence = newCardSentence.trim();

    if (trimmedName === "") {
      setNewCardNameError(true);
      return;
    }

    if (trimmedMeaning === "") {
      setNewCardMeaningError(true);
      return;
    }

    if (trimmedSentence === "") {
      setNewCardSentenceError(true);
      return;
    }

    const isDuplicateName =
      trimmedName.toLowerCase() !== previousCard.name.toLowerCase() &&
      cardNames.includes(trimmedName.toLowerCase());

    if (!isDuplicateName) {
      const newCard = {
        name:
          trimmedName.charAt(0).toUpperCase() +
          trimmedName.slice(1).toLowerCase(),
        type: trimmedType,
        meaning: trimmedMeaning,
        sentence: trimmedSentence,
      };
      onEditCard(newCard);
      onClose();
    } else {
      setNewCardNameError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm" />

      <div
        className="relative z-10 bg-white rounded-lg p-6 shadow-lg w-100
        flex flex-col justify-center gap-4"
      >
        <h2 className="text-2xl md:text-3xl font-medium">Edit Card</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-xl">New Word</h3>
            <input
              type="text"
              value={newCardName}
              onChange={handleCardName}
              placeholder="Enter card name"
              className={`w-full p-2 border rounded text-lg md:text-xl ${
                isNewCardNameError ? "border-myred" : ""
              }`}
            />
            {isNewCardNameError && (
              <p className="text-lg text-myred text-center">
                {newCardName == ""
                  ? "Please enter the name!!!"
                  : "That name is already taken!!!"}
              </p>
            )}
          </div>

          {/* Type */}
          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-xl">New Type</h3>
            <select
              value={newCardType}
              onChange={handleCardType}
              className={`w-full p-2 border rounded text-lg sm:text-xl`}
              defaultValue={previousCard.type}
            >
              {wordTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                  disabled={previousCard.type === type}
                >
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Meaning */}
          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-xl">New Meaning</h3>
            <input
              type="text"
              value={newCardMeaning}
              onChange={handleCardMeaning}
              placeholder="Enter new card meaning"
              className={`w-full p-2 border rounded text-lg md:text-xl ${
                isNewCardMeaningError ? "border-myred" : ""
              }`}
            />
            {isNewCardMeaningError && (
              <p className="text-lg text-myred text-center">
                Please enter the meaning!!!
              </p>
            )}
          </div>

          {/* Sentence */}
          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-xl">New Sentence</h3>
            <input
              type="text"
              value={newCardSentence}
              onChange={handleCardSentence}
              placeholder="Enter card sentence"
              className={`w-full p-2 border rounded text-lg md:text-xl}`}
            />
            {isNewCardSentenceError && (
              <p className="text-lg text-myred text-center">
                Please enter the sentence!!!
              </p>
            )}
          </div>

          {/* Buttons */}
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
