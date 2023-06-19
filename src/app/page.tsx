import DogsList from "@/components/DogsList";
import getDogsList from "@/lib/getDogsList";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<p>Loading...</p>}>
        <DogsList />
      </Suspense>
    </main>
  );
}
