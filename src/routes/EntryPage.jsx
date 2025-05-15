import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function EntryPage() {
  const navigate = useNavigate();

  const goToGroupPage = () => {
    navigate("/category");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-16">
      <h1 className="text-bold text-6xl font-bold text-center">My Flashcard</h1>
      <Button text={"Start"} onClick={goToGroupPage}></Button>
    </div>
  );
}
