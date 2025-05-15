const ActionButton = ({ text, onClick }) => {
  return (
    <button
      className="border-2 bg-gradient-to-tr from-mydarkyellow to-myyellow 
        rounded-lg py-2 px-8 cursor-pointer text-2xl 
        min-w-[200px] w-fit text-myblack"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
