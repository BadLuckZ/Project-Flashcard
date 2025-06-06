import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import CardButton from "../components/CardButton";
import AddDeckModal from "../components/AddDeckModal";
import { useContext, useState } from "react";
import {
  addDecktoList,
  loadDeck,
  loadDeckList,
  removeDeckFromList,
  updateDeck,
  updateDeckList,
} from "../utils/functions";
import EditDeckModal from "../components/EditDeckModal";
import RemoveModal from "../components/RemoveModal";
import { NotificationContext } from "../context/NotificationContext";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { addNotification } = useContext(NotificationContext);
  const [isOpenAddModal, setOpenAddModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [isOpenRemoveModal, setOpenRemoveModal] = useState(false);
  const [isRemoveDeck, setRemoveDeck] = useState(false);
  const [isEditDeck, setEditDeck] = useState(false);
  const [deckList, setDeckList] = useState(loadDeckList());
  const [deckToEdit, setDeckToEdit] = useState("");
  const [deckToRemove, setDeckToRemove] = useState("");

  const handleAddDeck = (deckName) => {
    setDeckList((prev) => {
      const newDeckList = [...prev, deckName].sort();
      updateDeckList(newDeckList);
      addDecktoList(deckName);
      return newDeckList;
    });
    addNotification(true, `You have added ${deckName} to your decklist.`);
  };

  const handleEditDeck = (previousDeckName, newDeckName) => {
    const deck = loadDeck(previousDeckName);
    removeDeckFromList(previousDeckName);

    updateDeck(newDeckName, deck);

    const updatedDeckList = [
      ...deckList.filter((dName) => dName !== previousDeckName),
      newDeckName,
    ].sort();
    setDeckList(updatedDeckList);
    updateDeckList(updatedDeckList);
    addNotification(
      true,
      `You have renamed ${previousDeckName} to ${newDeckName}.`
    );
  };

  const handleDeleteDeck = (deckName) => {
    setDeckList((prev) => {
      const newDeckList = prev.filter((deck) => deck !== deckName).sort();
      removeDeckFromList(deckName);
      updateDeckList(newDeckList);
      return newDeckList;
    });
    addNotification(
      true,
      `You have removed ${deckName} deck from your decklist.`
    );
  };

  return (
    <>
      {isOpenAddModal && (
        <AddDeckModal
          onClose={() => setOpenAddModal(false)}
          onAddDeck={handleAddDeck}
        />
      )}
      {isOpenEditModal && (
        <EditDeckModal
          onClose={() => setOpenEditModal(false)}
          onEditDeck={handleEditDeck}
          previousDeckName={deckToEdit}
        />
      )}
      {isOpenRemoveModal && (
        <RemoveModal
          onClose={() => {
            setOpenRemoveModal(false);
          }}
          onRemove={handleDeleteDeck}
          name={deckToRemove}
          type={"Deck"}
        />
      )}

      <div className="relative z-0 flex flex-col items-center min-h-screen h-fit justify-center gap-8 p-4">
        <h1 className="font-bold text-4xl md:text-5xl text-center text-myblack">
          {isRemoveDeck
            ? "Remove Your Deck!"
            : isEditDeck
            ? "Edit Your Deck!"
            : "Pick Your Deck!"}
        </h1>

        {deckList.length === 0 ? (
          <p className="text-3xl md:text-4xl text-mydarkgreen font-semibold text-center">
            No Decks Here...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto justify-items-center">
            {deckList.map((deckName) => (
              <div
                key={deckName}
                className="relative flex justify-center items-center gap-2"
              >
                <CardButton
                  text={deckName}
                  onClick={() => navigate(`/category/${deckName}`)}
                  isDisabled={isRemoveDeck || isEditDeck}
                />
                {isRemoveDeck && (
                  <p
                    className="cursor-pointer text-xl md:text-2xl"
                    onClick={() => {
                      setOpenRemoveModal(true);
                      setDeckToRemove(deckName);
                    }}
                  >
                    ❌
                  </p>
                )}
                {isEditDeck && (
                  <p
                    className="cursor-pointer text-xl md:text-2xl"
                    onClick={() => {
                      setOpenEditModal(true);
                      setDeckToEdit(deckName);
                    }}
                  >
                    🔄
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 flex-wrap flex-col md:flex-row justify-center items-center">
          <ActionButton
            text="Add"
            onClick={() => setOpenAddModal(true)}
            isHidden={isRemoveDeck || isEditDeck}
          />
          <ActionButton
            text={isEditDeck ? "Done" : "Edit"}
            onClick={() => {
              setEditDeck(!isEditDeck);
              setRemoveDeck(false);
            }}
            isHidden={isRemoveDeck || deckList.length === 0}
          />
          <ActionButton
            text={isRemoveDeck ? "Done" : "Remove"}
            onClick={() => {
              setRemoveDeck(!isRemoveDeck);
              setEditDeck(false);
            }}
            isHidden={(deckList.length === 0 && !isRemoveDeck) || isEditDeck}
          />
        </div>
        <ActionButton
          text="Back to Home"
          onClick={() => {
            navigate("/");
          }}
          isHidden={isEditDeck || isRemoveDeck}
        />
      </div>
    </>
  );
}
