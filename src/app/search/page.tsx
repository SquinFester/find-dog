"use client";

import getDogsList from "@/lib/getDogsList";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Image from "next/image";
import getDogImg from "@/lib/getDogImg";

type DogOption = {
  name: string;
};

export default function Search() {
  const [dogs, setDogs] = useState<DogOption[]>([]);
  const [input, setInput] = useState<string>("");
  const [src, setSrc] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchDogs = async () => {
      const res: DogSpec[] = await getDogsList();
      const ar: DogOption[] = [];
      res.map((r) => {
        const name = r.ext ? `${r.ext} ${r.breed}` : r.breed;
        ar.push({ name });
      });
      setDogs((prev) => prev.concat(ar));
    };
    fetchDogs();
  }, []);

  const options =
    input.trim().length > 0
      ? dogs.filter((dog) => dog.name.includes(input))
      : [];

  const fetchImg = async () => {
    setLoading(() => true);
    setError(() => false);
    const conv = input
      .toLocaleLowerCase()
      .split(" ")
      .reverse()
      .filter((i) => i !== "");

    const getSrc = await getDogImg(conv);
    if (getSrc.status === "success") {
      setSrc(() => getSrc.message);
      setLoading(() => false);
    } else {
      setSrc(() => "");
      setError(() => true);
      setLoading(() => false);
    }
  };

  return (
    <main className="flex flex-col items-center ">
      <input
        className=" w-full rounded-md border-2 border-solid border-primary px-1 py-1 text-black"
        type="text"
        value={input}
        onChange={(e) => setInput(() => e.target.value)}
      />

      <div className="relative w-full">
        <ul className="absolute top-0 z-10 block max-h-96 w-full overflow-y-scroll rounded-md bg-neutral-400 px-1">
          {options.map((dog) => (
            <li
              key={nanoid()}
              onClick={() => setInput(() => dog.name)}
              className="cursor-pointer"
            >
              <button>{dog.name}</button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => fetchImg()}
        className="my-8 w-full rounded-md bg-primary py-2 text-white"
      >
        Search
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        src.length > 0 && (
          <div className="flex flex-col items-center">
            <Image src={src} alt="dog's img" width={500} height={500} />
            <h1>{input} 😍</h1>
          </div>
        )
      )}

      {error && <p>Dog's img not found</p>}
    </main>
  );
}
