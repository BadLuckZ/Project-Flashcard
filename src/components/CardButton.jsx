const CardButton = ({ text, onClick }) => {
  return (
    <button
      className="border-2 bg-gradient-to-tr from-myblue to-mylightblue
        rounded-lg py-2 px-8 cursor-pointer text-xl sm:text-2xl w-[150px] sm:w-[180px]
        text-myblack text-center"
      onClick={onClick}
    >
      <span className="block w-full truncate">{text}</span>
    </button>
  );
};

export default CardButton;
