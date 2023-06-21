import Image from "next/image";

export default function Loading() {
  return (
    <main className="flex justify-center">
      <Image src="/loading-dots.svg" width={30} height={30} alt="loading" />
    </main>
  );
}
