import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import CardButton from "../components/CardButton";
import AddDeckModal from "../components/AddDeckModal";
import { getUniqueGroup } from "../utils/data";
import { useState } from "react";

export default function CategoryPage() {
  const navigate = useNavigate();

  const [isAddDeck, setAddDeck] = useState(false);
  const [deckList, setDeckList] = useState(getUniqueGroup());

  const goBacktoEntry = () => {
    navigate("/");
  };

  const addDeck = () => {
    setAddDeck(true);
  };

  const handleDeckSubmit = (newDeck) => {
    setDeckList((prev) => [...prev, newDeck]);
    setAddDeck(false);
  };

  const closeModal = () => {
    setAddDeck(false);
  };

  return (
    <>
      {isAddDeck && (
        <AddDeckModal onClose={closeModal} onSubmit={handleDeckSubmit} />
      )}
      <div className="relative z-0 flex flex-col items-center justify-center gap-8 min-h-screen">
        <h1 className="font-bold text-4xl sm:text-5xl text-center text-myblack">
          Pick Your Deck!
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {deckList.map((cur_group) => (
            <CardButton
              key={cur_group}
              text={cur_group}
              onClick={() => navigate(`/category/${cur_group}`)}
            />
          ))}
        </div>
        <div className="flex gap-4 flex-wrap justify-center items-center">
          <ActionButton text={"Add"} onClick={addDeck} />
          <ActionButton text={"Back"} onClick={goBacktoEntry} />
        </div>
      </div>
    </>
  );
}
