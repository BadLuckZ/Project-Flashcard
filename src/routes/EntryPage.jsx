import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";

export default function EntryPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-16 min-h-screen h-fit justify-center py-4">
      <div className="flex gap-4 items-center justify-center">
        <img src="/logo.svg" className="w-[50px] h-auto" />
        <h1 className="text-5xl font-bold text-center text-myblack sm:text-6xl">
          My Flashcard
        </h1>
        <img src="/logo.svg" className="w-[50px] h-auto" />
      </div>
      <ActionButton
        text={"Start"}
        onClick={() => {
          navigate("/category");
        }}
      />
    </div>
  );
}
