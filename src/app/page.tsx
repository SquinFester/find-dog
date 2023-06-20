import DogsList from "@/components/DogsList";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <DogsList />
      </Suspense>
    </main>
  );
}
