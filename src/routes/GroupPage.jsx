import { useParams } from "react-router-dom";

export default function GroupPage() {
  const { targetGroup } = useParams();

  return <h1>Hello {targetGroup}</h1>;
}
