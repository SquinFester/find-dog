import { Suspense } from "react";

export default async function Home() {
  const getDogs = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await res.json();
    return data;
  };

  const dogs = await getDogs();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        <Suspense fallback={<p>Loading...</p>}>
          {Object.keys(dogs.message).map((name) => (
            <li key={name}>{name}</li>
          ))}
        </Suspense>
      </ul>
    </main>
  );
}
