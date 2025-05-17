import { useParams } from "react-router-dom";
import { loadDeck, updateDeck } from "../utils/functions";
import ActionButton from "../components/ActionButton";
import { useState } from "react";
import AddCardModal from "../components/AddCardModal";

export default function DeckPage() {
  const { deckParam } = useParams();
  const [isOpenModal, setOpenModal] = useState(false);
  const [currentDeck, setCurrentDeck] = useState(loadDeck(deckParam));

  const wordCount = currentDeck.length;

  const handleAddCard = (card) => {
    setCurrentDeck((prev) => {
      const updatedCardList = [...prev, card];
      updateDeck(deckParam, updatedCardList);
      return updatedCardList;
    });
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
          <div>
            {currentDeck.map((card, idx) => {
              return (
                <div key={card.name}>
                  <p key={card.name + idx}>{card.name}</p>
                  <p key={card.name + card.type}>{card.type}</p>
                  <p key={card.name + card.meaning}>{card.meaning}</p>
                  <p key={card.name + card.sentence}>{card.sentence}</p>
                </div>
              );
            })}
          </div>
        )}
        <ActionButton
          text={"Add"}
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
    </>
  );
}
