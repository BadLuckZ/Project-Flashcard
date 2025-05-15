const Button = ({ text, onClick }) => {
  return (
    <button
      className="border-2 bg-gradient-to-tr from-mydarkyellow to-myyellow rounded-lg py-2 px-10 cursor-pointer text-2xl"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
