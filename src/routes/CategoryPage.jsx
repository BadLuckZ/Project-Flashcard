import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import CardButton from "../components/CardButton";
import AddDeckModal from "../components/AddDeckModal";
import { useEffect, useState } from "react";
import {
  addDecktoList,
  loadDeckList,
  removeDeckFromList,
  updateDeckList,
} from "../utils/functions";

export default function CategoryPage() {
  const navigate = useNavigate();
  const [isOpenModal, setOpenModal] = useState(false);
  const [isRemoveDeck, setRemoveDeck] = useState(false);
  const [deckList, setDeckList] = useState(loadDeckList());

  const handleAddDeck = (deckName) => {
    setDeckList((prev) => {
      const newDeckList = [...prev, deckName];
      updateDeckList(newDeckList);
      addDecktoList(deckName);
      return newDeckList;
    });
  };

  const handleDeleteDeck = (deckName) => {
    setDeckList((prev) => {
      const newDeckList = prev.filter((deck) => deck !== deckName);
      updateDeckList(newDeckList);
      removeDeckFromList(deckName);
      return newDeckList;
    });
  };

  return (
    <>
      {isOpenModal && (
        <AddDeckModal
          onClose={() => setOpenModal(false)}
          onAddDeck={handleAddDeck}
        />
      )}

      <div className="relative z-0 flex flex-col items-center justify-center gap-8 min-h-screen p-4">
        <h1 className="font-bold text-4xl sm:text-5xl text-center text-myblack">
          {isRemoveDeck ? "Remove Your Deck!" : "Pick Your Deck!"}
        </h1>

        {deckList.length === 0 ? (
          <p className="text-3xl sm:text-4xl text-mydarkgreen font-semibold text-center">
            No Decks Here...
          </p>
        ) : (
          <div
            className={`grid grid-cols-${Math.min(
              1,
              deckList.length
            )} sm:grid-cols-${Math.min(
              2,
              deckList.length
            )} md:grid-cols-${Math.min(
              3,
              deckList.length
            )} lg:grid-cols-${Math.min(
              4,
              deckList.length
            )} gap-4 max-w-6xl mx-auto`}
          >
            {deckList.map((deckName) => (
              <div
                key={deckName}
                className="relative flex justify-center items-center gap-2"
              >
                <CardButton
                  text={deckName}
                  onClick={() => navigate(`/category/${deckName}`)}
                  isRemoveDeck={isRemoveDeck}
                />
                {isRemoveDeck && (
                  <button
                    className="border-2 bg-myyellow rounded py-0.5 px-2 cursor-pointer"
                    onClick={() => handleDeleteDeck(deckName)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 flex-wrap flex-col md:flex-row justify-center items-center">
          <ActionButton
            text="Add"
            onClick={() => setOpenModal(true)}
            isHidden={isRemoveDeck}
          />
          <ActionButton
            text={isRemoveDeck ? "Done" : "Remove"}
            onClick={() => setRemoveDeck(!isRemoveDeck)}
            isHidden={deckList.length === 0 && !isRemoveDeck}
          />
        </div>
      </div>
    </>
  );
}
