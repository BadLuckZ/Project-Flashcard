import { useState } from "react";
import { loadDeckList } from "../utils/functions";

export default function AddDeckModal({ onClose, onAddDeck }) {
  const [deckName, setDeckName] = useState("");
  const [deckList, setDeckList] = useState(loadDeckList());
  const [isAddDeckError, setAddDeckError] = useState(false);

  const handleDeckName = (e) => {
    e.preventDefault();
    setAddDeckError(false);
    setDeckName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const trimmedDeckName = deckName.trim();
    if (!trimmedDeckName || deckList.includes(trimmedDeckName)) {
      setAddDeckError(true);
      return;
    }

    onAddDeck(trimmedDeckName);

    setDeckName("");
    setAddDeckError(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm" />

      <div
        className="relative z-10 bg-white rounded-lg p-6 shadow-lg w-80 
        flex flex-col justify-center gap-4"
      >
        <h2 className="text-2xl sm:text-3xl font-medium">Add New Deck</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={deckName}
            onChange={handleDeckName}
            placeholder="Enter deck name"
            className={`w-full p-2 border rounded text-lg sm:text-xl ${
              isAddDeckError ? "border-myred" : ""
            }`}
          />
          {isAddDeckError && (
            <p className="text-lg text-myred text-center">
              {deckName == ""
                ? "Please enter the name!!!"
                : "That name is already taken!!!"}
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
