import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";

export default function EntryPage() {
  const navigate = useNavigate();

  const goToGroupPage = () => {
    navigate("/category");
  };

  return (
    <div className="flex flex-col items-center gap-16 px-4">
      <h1 className="text-6xl font-bold text-center text-myblack">
        My Flashcard
      </h1>
      <ActionButton text={"Start"} onClick={goToGroupPage} />
    </div>
  );
}
