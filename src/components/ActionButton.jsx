const ActionButton = ({ text, onClick }) => {
  return (
    <button
      className="border-2 bg-gradient-to-tr from-mydarkyellow to-myyellow 
        rounded-lg py-2 px-8 cursor-pointer text-2xl sm:text-3xl 
        w-[200px] sm:w-[240px] text-myblack text-center"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
