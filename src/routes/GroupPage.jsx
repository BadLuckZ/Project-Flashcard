import { useParams } from "react-router-dom";

export default function GroupPage() {
  const { targetGroup } = useParams();

  return (
    <div className="relative z-0 flex flex-col items-center justify-center gap-8 min-h-screen p-4">
      <p>Hello {targetGroup}</p>
    </div>
  );
}
