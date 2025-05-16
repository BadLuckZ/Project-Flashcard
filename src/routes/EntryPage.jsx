import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";

export default function EntryPage() {
  const navigate = useNavigate();

  const goToGroupPage = () => {
    navigate("/category");
  };

  return (
    <div className="flex flex-col items-center gap-16 min-h-screen justify-center">
      <h1 className="text-5xl font-bold text-center text-myblack sm:text-6xl">
        My Flashcard
      </h1>
      <ActionButton text={"Start"} onClick={goToGroupPage} />
    </div>
  );
}
