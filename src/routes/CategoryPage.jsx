import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import CardButton from "../components/CardButton";
import AddDeckModal from "../components/AddDeckModal";
import { useState } from "react";
import loadDeckList from "../utils/functions";

export default function CategoryPage() {
  const navigate = useNavigate();
  const [isAddDeck, setAddDeck] = useState(false);
  const [deckList, setDeckList] = useState(loadDeckList());

  const goBacktoEntry = () => {
    navigate("/");
  };

  const addDeck = () => {
    setAddDeck(true);
  };

  const closeModal = () => {
    setAddDeck(false);
  };

  const handleNewDeck = (newDeck) => {
    setDeckList((prev) => [...prev, newDeck]);
  };

  return (
    <>
      {isAddDeck && (
        <AddDeckModal onClose={closeModal} onAddDeck={handleNewDeck} />
      )}
      <div className="relative z-0 flex flex-col items-center justify-center gap-8 min-h-screen">
        <h1 className="font-bold text-4xl sm:text-5xl text-center text-myblack">
          Pick Your Deck!
        </h1>
        {deckList.length === 0 ? (
          <p className="text-3xl sm:text-4xl text-mydarkgreen font-semibold text-center">
            No Decks Here...
          </p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center items-center sm:flex-row flex-col">
            {deckList.map((cur_group) => (
              <CardButton
                key={cur_group}
                text={cur_group}
                onClick={() => navigate(`/category/${cur_group}`)}
              />
            ))}
          </div>
        )}
        <div className="flex gap-4 flex-wrap justify-center items-center">
          <ActionButton text={"Add"} onClick={addDeck} />
          <ActionButton text={"Back"} onClick={goBacktoEntry} />
        </div>
      </div>
    </>
  );
}
