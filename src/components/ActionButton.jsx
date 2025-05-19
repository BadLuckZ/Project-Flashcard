const ActionButton = ({ text, onClick, isHidden = false }) => {
  if (isHidden) return null;

  return (
    <button
      className={`border-2 bg-gradient-to-tr from-mydarkyellow to-myyellow 
        rounded-lg py-2 px-4 cursor-pointer text-xl md:text-2xl 
        w-[200px] sm:w-[225px] md:w-[250px] lg-[275px] text-myblack text-center`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
