const ActionButton = ({ text, onClick, isHidden = false, className = "" }) => {
  if (isHidden) return null;

  return (
    <button
      className={`border-2 bg-gradient-to-tr from-mydarkyellow to-myyellow 
        rounded-lg py-2 px-4 cursor-pointer text-xl md:text-2xl 
        w-[200px] md:w-[225px] lg:w-[250px] text-myblack text-center ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
