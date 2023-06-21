import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 mb-4 w-full rounded-xl border-b-2 border-primary bg-white text-primary">
      <div className="mx-auto flex w-3/4 max-w-5xl items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="logo dog's hand"
            width={64}
            height={64}
          />
        </Link>
        <h1 className="text-2xl font-bold">FIND DOG&apos;S IMAGE</h1>
      </div>
    </header>
  );
};
export default Header;
