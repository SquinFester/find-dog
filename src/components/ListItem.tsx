import Link from "next/link";
import { nanoid } from "nanoid";

const ListItem = ({ dogInfo }: { dogInfo: DogSpec }) => {
  const { ext, breed } = dogInfo;

  const name = ext ? `${ext} ${breed}` : breed;

  return (
    <Link
      href={ext ? `${breed}/${ext}` : breed}
      key={nanoid()}
      className="group grid h-32 place-items-center rounded-xl border-2 border-solid 
      border-primary bg-white text-primary hover:bg-neutral-200 sm:h-36 xl:h-40"
    >
      <h1 className="text-3xl font-semibold capitalize group-hover:underline">
        {name}
      </h1>
    </Link>
  );
};
export default ListItem;
