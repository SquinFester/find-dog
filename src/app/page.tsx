import getDogsList from "@/lib/getDogsList";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const dogs: DogSpec[] = await getDogsList();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        <Suspense fallback={<p>Loading...</p>}>
          {dogs.map((dog) => (
            <li>
              <Link href={dog.link} key={Math.random().toFixed(2)}>
                {dog.name}
              </Link>
            </li>
          ))}
        </Suspense>
      </ul>
    </main>
  );
}
