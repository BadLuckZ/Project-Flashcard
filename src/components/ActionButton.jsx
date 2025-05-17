const ActionButton = ({ text, onClick, isHidden = false }) => {
  return (
    <button
      className={`border-2 bg-gradient-to-tr from-mydarkyellow to-myyellow 
        rounded-lg py-2 px-4 cursor-pointer ${
          isHidden ? "hidden" : ""
        } text-xl sm:text-2xl 
        w-[200px] sm:w-[225px] text-myblack text-center`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
