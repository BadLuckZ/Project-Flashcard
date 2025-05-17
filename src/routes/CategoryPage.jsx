import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import CardButton from "../components/CardButton";
import AddDeckModal from "../components/AddDeckModal";
import { useState } from "react";
import { loadDeckList, updateDeckList } from "../utils/functions";

export default function CategoryPage() {
  const navigate = useNavigate();
  const [isOpenModal, setOpenModal] = useState(false);
  const [isRemoveDeck, setRemoveDeck] = useState(false);
  const [deckList, setDeckList] = useState(loadDeckList());

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleAddDeck = (newDeck) => {
    setDeckList((prev) => {
      const updated = [...prev, newDeck];
      updateDeckList(updated);
      return updated;
    });
  };

  const handleDeleteDeck = (deckToDelete) => {
    setDeckList((prev) => {
      const updated = prev.filter((deck) => deck !== deckToDelete);
      updateDeckList(updated);
      return updated;
    });
  };

  return (
    <>
      {isOpenModal && (
        <AddDeckModal onClose={closeModal} onAddDeck={handleAddDeck} />
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
            {deckList.map((cur_group) => (
              <div
                key={cur_group}
                className="relative flex justify-center items-center gap-2"
              >
                <CardButton
                  text={cur_group}
                  onClick={() => navigate(`/category/${cur_group}`)}
                  isRemoveDeck={isRemoveDeck}
                />
                {isRemoveDeck && (
                  <button
                    className="border-2 bg-myyellow rounded py-0.5 px-2 cursor-pointer"
                    onClick={() => handleDeleteDeck(cur_group)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-4 flex-wrap flex-col md:flex-row justify-center items-center">
          <ActionButton
            text={"Back"}
            onClick={() => {
              navigate("/");
            }}
            isHidden={isRemoveDeck}
          />
          <ActionButton
            text={"Add"}
            onClick={() => {
              setOpenModal(true);
            }}
            isHidden={isRemoveDeck}
          />
          <ActionButton
            text={isRemoveDeck ? "Done" : "Remove"}
            onClick={() => setRemoveDeck(!isRemoveDeck)}
            isHidden={deckList.length == 0 && !isRemoveDeck}
          />
        </div>
      </div>
    </>
  );
}
