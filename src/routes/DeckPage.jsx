import { useNavigate, useParams } from "react-router-dom";
import { loadDeck, shuffleDeck, updateDeck } from "../utils/functions";
import ActionButton from "../components/ActionButton";
import { useContext, useEffect, useState } from "react";
import AddCardModal from "../components/AddCardModal";
import Card from "../components/Card";
import EditCardModal from "../components/EditCardModal";
import RemoveModal from "../components/RemoveModal";
import { NotificationContext } from "../context/NotificationContext";

export default function DeckPage() {
  const { deckParam } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useContext(NotificationContext);
  const [isOpenAddModal, setOpenAddModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [isOpenRemoveModal, setOpenRemoveModal] = useState(false);
  const [currentDeck, setCurrentDeck] = useState(loadDeck(deckParam));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLastCard, setLastCard] = useState(false);

  const wordCount = currentDeck.length;

  const handleAddCard = (card) => {
    addNotification(true, `You have added ${card.name} to ${deckParam}.`);
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

  const handleEditCard = (newCard) => {
    const newDeck = loadDeck(deckParam);
    newDeck[currentIdx].name = newCard.name;
    newDeck[currentIdx].type = newCard.type;
    newDeck[currentIdx].meaning = newCard.meaning;
    newDeck[currentIdx].sentence = newCard.sentence;

    addNotification(
      true,
      `You have changed ${currentDeck[currentIdx].name}'s information.`
    );
    setCurrentDeck(newDeck);
  };

  const handleRemoveCard = () => {
    addNotification(
      true,
      `You have remove ${currentDeck[currentIdx].name} from ${deckParam}.`
    );
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
    handleShuffle();
  };

  const handleShuffle = () => {
    const shuffledDeck = shuffleDeck([...currentDeck]);
    setCurrentDeck(shuffledDeck);
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
      {isOpenAddModal && (
        <AddCardModal
          onClose={() => setOpenAddModal(false)}
          onAddCard={handleAddCard}
          deck={currentDeck}
        />
      )}
      {isOpenEditModal && (
        <EditCardModal
          onClose={() => setOpenEditModal(false)}
          previousCard={currentDeck[currentIdx]}
          onEditCard={handleEditCard}
          deck={currentDeck}
        />
      )}
      {isOpenRemoveModal && (
        <RemoveModal
          onClose={() => setOpenRemoveModal(false)}
          onRemove={handleRemoveCard}
          name={currentDeck[currentIdx].name}
          type={"Card"}
        />
      )}

      <div className="relative z-0 flex flex-col items-center justify-center gap-8 min-h-screen p-4">
        <div className="flex gap-2 items-center">
          <h1 className="font-bold text-4xl md:text-5xl text-center text-myblack">
            {deckParam}
          </h1>
          {wordCount !== 0 && (
            <h2 className="font-semibold text-2xl md:text-3xl">
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
          <div className="flex gap-2 flex-col md:flex-row">
            <ActionButton
              text="Previous"
              onClick={handlePreviousCard}
              isHidden={currentIdx === 0}
            />
            <ActionButton
              text="Next"
              onClick={handleNextCard}
              isHidden={isLastCard}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <ActionButton text="Add" onClick={() => setOpenAddModal(true)} />
            <ActionButton
              text="Edit"
              onClick={() => setOpenEditModal(true)}
              isHidden={wordCount === 0}
            />
          </div>
          <div className="flex flex-col gap-2">
            <ActionButton
              text="Remove"
              onClick={() => {
                setOpenRemoveModal(true);
              }}
              isHidden={wordCount === 0}
            />
            <ActionButton
              text="Reset"
              onClick={handleReset}
              isHidden={wordCount <= 1}
            />
          </div>
        </div>
        <ActionButton
          text="Back to Category"
          onClick={() => {
            navigate("/category");
          }}
        />
      </div>
    </>
  );
}
