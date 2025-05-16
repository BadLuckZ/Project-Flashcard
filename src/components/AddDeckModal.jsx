import React, { useState } from "react";

export default function AddDeckModal({ onClose, onSubmit }) {
  const [deckName, setDeckName] = useState("");

  const handleSubmit = () => {
    if (deckName.trim()) {
      onSubmit(deckName.trim());
      setDeckName("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 bg-white rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-xl font-medium mb-4">Add New Deck</h2>
        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Enter deck name"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-white cursor-pointer border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 border bg-mydarkgreen text-white rounded cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
