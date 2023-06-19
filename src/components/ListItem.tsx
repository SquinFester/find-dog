import Link from "next/link";
import { nanoid } from "nanoid";

const ListItem = ({ dogInfo }: { dogInfo: DogSpec }) => {
  const { ext, breed } = dogInfo;

  const name = ext ? `${ext} ${breed}` : breed;

  return (
    <Link
      href={ext ? `${breed}/${ext}` : breed}
      key={nanoid()}
      className="h-36 bg-white text-black"
    >
      {name}
    </Link>
  );
};
export default ListItem;
