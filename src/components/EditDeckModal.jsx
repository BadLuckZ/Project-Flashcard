import { useState } from "react";
import { loadDeckList } from "../utils/functions";
import { limitCharacterNumber } from "../utils/constant";

export default function EditDeckModal({
  onClose,
  onEditDeck,
  previousDeckName,
}) {
  const [newDeckName, setNewDeckName] = useState("");
  const [deckList, setDeckList] = useState(loadDeckList());
  const [isEditDeckError, setEditDeckError] = useState(false);

  const handleDeckName = (e) => {
    e.preventDefault();
    setEditDeckError(false);
    setNewDeckName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const trimmedNewDeckName = newDeckName.trim();
    if (
      !trimmedNewDeckName ||
      trimmedNewDeckName.length > limitCharacterNumber ||
      deckList.includes(trimmedNewDeckName)
    ) {
      setEditDeckError(true);
      return;
    }

    onEditDeck(previousDeckName, trimmedNewDeckName);

    setNewDeckName("");
    setEditDeckError(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm" />

      <div
        className="relative z-10 bg-white rounded-lg p-6 shadow-lg w-100
        flex flex-col justify-center gap-4"
      >
        <h2 className="text-2xl md:text-3xl font-medium">Edit Deck</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl">From</h3>
            <p className="w-full text-xl md:text-2xl font-medium text-mydarkgreen">
              {previousDeckName}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl">To</h3>
            <input
              type="text"
              value={newDeckName}
              onChange={handleDeckName}
              placeholder="Enter deck name"
              className={`w-full p-2 border rounded text-lg md:text-xl ${
                isEditDeckError ? "border-myred" : ""
              }`}
            />
            {!isEditDeckError && (
              <p className="text-lg text-center">
                No more than {limitCharacterNumber} Characters
              </p>
            )}
            {isEditDeckError && (
              <p className="text-lg text-myred text-center">
                {newDeckName == ""
                  ? "Please enter the name!!!"
                  : newDeckName == previousDeckName
                  ? "That's the same!!!"
                  : newDeckName.trim().length > limitCharacterNumber
                  ? `I said no more than ${limitCharacterNumber}!!!`
                  : "That name is already taken!!!"}
              </p>
            )}
          </div>
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
