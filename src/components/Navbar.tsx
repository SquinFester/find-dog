import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { BsFillSearchHeartFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <nav className="sticky bottom-8 z-10 flex w-full justify-center  text-4xl text-primary">
      <div
        className="flex w-1/2 max-w-xl items-center justify-around rounded-xl
    bg-white py-2 shadow-primary drop-shadow-xl "
      >
        <Link
          href="/"
          className="rounded-full p-2 transition hover:bg-neutral-500/30 focus:hover:bg-neutral-500/30"
        >
          <AiFillHome />
        </Link>
        <Link
          href="/search"
          className="rounded-full p-2 transition hover:bg-neutral-500/30 focus:bg-neutral-500/30"
        >
          <BsFillSearchHeartFill />
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
