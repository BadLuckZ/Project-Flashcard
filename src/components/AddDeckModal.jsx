import React, { useState, useRef, useEffect } from "react";
import loadDeckList from "../utils/functions";

export default function AddDeckModal({ onClose, onAddDeck }) {
  const [deckName, setDeckName] = useState("");
  const [deckList, setDeckList] = useState(loadDeckList());
  const [isAddDeckError, setAddDeckError] = useState(false);

  const handleDeckName = (e) => {
    setDeckName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const deck = deckName.trim();
    if (!deck || deckList.includes(deck)) {
      setAddDeckError(true);
      return;
    }

    const updatedList = [...deckList, deck];
    setDeckList(updatedList);
    localStorage.setItem("deckList", JSON.stringify(updatedList));
    setDeckName("");
    setAddDeckError(false);
    onAddDeck(deck);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 bg-white rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-xl font-medium mb-4">Add New Deck</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={deckName}
            onChange={handleDeckName}
            placeholder="Enter deck name"
            className="w-full p-2 border rounded mb-3"
          />
          {isAddDeckError && (
            <p className="text-sm text-red-600 text-center mb-2">
              That name is already taken!!!
            </p>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-white cursor-pointer border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border bg-mydarkgreen text-white rounded cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
