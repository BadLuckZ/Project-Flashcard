import { useParams } from "react-router-dom";
import { loadDeck, updateDeck } from "../utils/functions";
import ActionButton from "../components/ActionButton";
import { useEffect, useState } from "react";
import AddCardModal from "../components/AddCardModal";
import Card from "../components/Card";

export default function DeckPage() {
  const { deckParam } = useParams();
  const [isOpenModal, setOpenModal] = useState(false);
  const [currentDeck, setCurrentDeck] = useState(loadDeck(deckParam));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLastCard, setLastCard] = useState(false);

  const wordCount = currentDeck.length;

  const handleAddCard = (card) => {
    setCurrentDeck((prev) => [...prev, card]);
    setLastCard(false);
  };

  const handleNextCard = () => {
    if (currentIdx < currentDeck.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setLastCard(true);
    }
  };

  const handlePreviousCard = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleRemoveCard = () => {
    setCurrentDeck((prevDeck) => {
      const updatedDeck = prevDeck.filter((_, idx) => idx !== currentIdx);
      const newIdx = currentIdx > 0 ? currentIdx - 1 : 0;
      setCurrentIdx(newIdx);

      if (updatedDeck.length === 0 || newIdx === updatedDeck.length) {
        setLastCard(true);
      }

      return updatedDeck;
    });
  };

  const handleReset = () => {
    setCurrentIdx(0);
  };

  useEffect(() => {
    updateDeck(deckParam, currentDeck);
  }, [currentDeck, deckParam]);

  useEffect(() => {
    if (currentIdx === currentDeck.length - 1 && currentDeck.length > 0) {
      setLastCard(true);
    } else {
      setLastCard(false);
    }
  }, [currentIdx, currentDeck.length]);

  return (
    <>
      {isOpenModal && (
        <AddCardModal
          onClose={() => setOpenModal(false)}
          onAddCard={handleAddCard}
          deckParam={deckParam}
        />
      )}

      <div className="relative z-0 flex flex-col items-center justify-center gap-8 min-h-screen p-4">
        <div className="flex gap-2 items-center">
          <h1 className="font-bold text-4xl sm:text-5xl text-center text-myblack">
            {deckParam}
          </h1>
          {wordCount !== 0 && (
            <h2 className="font-semibold text-3xl sm:text-4xl">
              ({currentIdx + 1}/{wordCount})
            </h2>
          )}
        </div>

        {wordCount === 0 ? (
          <p className="text-3xl sm:text-4xl text-mydarkgreen font-semibold text-center">
            This deck is empty...
          </p>
        ) : (
          <Card
            key={currentDeck[currentIdx].name}
            card={currentDeck[currentIdx]}
          />
        )}

        {wordCount > 1 && (
          <div className="flex gap-2">
            <ActionButton
              text="Previous"
              onClick={handlePreviousCard}
              isHidden={wordCount <= 1 || currentIdx === 0}
            />
            <ActionButton
              text="Reset"
              onClick={handleReset}
              isHidden={wordCount === 1 || !isLastCard}
            />
            <ActionButton
              text="Next"
              onClick={handleNextCard}
              isHidden={wordCount <= 1 || isLastCard}
            />
          </div>
        )}

        <div className="flex gap-2">
          <ActionButton text="Add" onClick={() => setOpenModal(true)} />
          <ActionButton
            text="Remove"
            onClick={handleRemoveCard}
            isHidden={wordCount === 0}
          />
        </div>
      </div>
    </>
  );
}
