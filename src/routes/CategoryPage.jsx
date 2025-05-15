import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import { getUniqueGroup } from "../utils/data";
import CardButton from "../components/CardButton";

export default function CategoryPage() {
  const navigate = useNavigate();
  const uniqueGroup = getUniqueGroup();

  const goBacktoEntry = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="font-bold text-4xl text-center text-myblack">
        Pick Your Deck!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uniqueGroup.map((cur_group) => {
          return (
            <CardButton
              key={cur_group}
              text={cur_group}
              onClick={() => {
                navigate(`/category/${cur_group}`);
              }}
            />
          );
        })}
      </div>
      <ActionButton text={"Back"} onClick={goBacktoEntry} />
    </div>
  );
}
