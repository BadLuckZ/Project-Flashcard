import { useNavigate } from "react-router-dom";

export default function EntryPage() {
  const navigate = useNavigate();

  const goToGroupPage = () => {
    navigate("/category");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-16">
      <h1 className="text-bold text-6xl font-bold text-center">My Flashcard</h1>
      <button
        className="border-2 bg-amber-300 rounded-lg py-2 px-10 cursor-pointer text-2xl"
        onClick={goToGroupPage}
      >
        Start
      </button>
    </div>
  );
}
