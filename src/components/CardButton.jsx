const CardButton = ({ text, onClick, isRemoveDeck }) => {
  return (
    <button
      className={`border-2 bg-gradient-to-tr from-myblue to-mylightblue
        rounded-lg py-2 px-4 ${
          !isRemoveDeck ? "cursor-pointer" : ""
        } text-xl sm:text-2xl w-[150px] sm:w-[175px]
        text-myblack text-center`}
      onClick={onClick}
      disabled={isRemoveDeck}
    >
      <span className="block w-full truncate">{text}</span>
    </button>
  );
};

export default CardButton;
