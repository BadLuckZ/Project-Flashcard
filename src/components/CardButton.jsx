const CardButton = ({ text, onClick, isDisabled = false, className = "" }) => {
  return (
    <button
      className={`border-2 bg-gradient-to-tr from-myblue to-mylightblue
        rounded-lg py-2 px-4 ${
          !isDisabled ? "cursor-pointer" : ""
        } text-xl md:text-2xl w-[150px] sm:w-[175px] md:w-[200px] lg:w-[225px]
        text-myblack text-center`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <span className="block w-full truncate">{text}</span>
    </button>
  );
};

export default CardButton;
