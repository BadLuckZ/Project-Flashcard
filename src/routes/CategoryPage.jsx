import { data, getUniqueGroup } from "../utils/data";

export default function CategoryPage() {
  const uniqueGroup = getUniqueGroup();
  console.log(uniqueGroup);
  return <h1>Hello World</h1>;
}
