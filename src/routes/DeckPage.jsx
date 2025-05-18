import { useParams } from "react-router-dom";
import { loadDeck, updateDeck } from "../utils/functions";
import ActionButton from "../components/ActionButton";
import { useState } from "react";
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
    setCurrentDeck((prev) => {
      const updatedCardList = [...prev, card];
      updateDeck(deckParam, updatedCardList);
      setLastCard(false);
      return updatedCardList;
    });
  };

  const handleNextCard = () => {
    if (currentIdx < currentDeck.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setLastCard(true);
    }
  };

  return (
    <>
      {isOpenModal && (
        <AddCardModal
          onClose={() => {
            setOpenModal(false);
          }}
          onAddCard={handleAddCard}
          deckParam={deckParam}
        />
      )}
      <div className="relative z-0 flex flex-col items-center justify-center gap-8 min-h-screen p-4">
        <h1 className="font-bold text-4xl sm:text-5xl text-center text-myblack">
          {deckParam}
        </h1>
        {wordCount == 0 ? (
          <p className="text-3xl sm:text-4xl text-mydarkgreen font-semibold text-center">
            This deck is empty...
          </p>
        ) : (
          <Card
            key={currentDeck[currentIdx].name}
            card={currentDeck[currentIdx]}
          />
        )}
        <ActionButton
          text={"Add"}
          onClick={() => {
            setOpenModal(true);
          }}
        />

        <ActionButton text={"Next"} onClick={handleNextCard} />
      </div>
    </>
  );
}
