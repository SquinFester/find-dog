"use client";

import getDogsList from "@/lib/getDogsList";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

type DogOption = {
  name: string;
  path: string;
};

export default function Search() {
  const [dogs, setDogs] = useState<DogOption[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const fetchDogs = async () => {
      const res: DogSpec[] = await getDogsList();
      const ar: DogOption[] = [];
      res.map((r) => {
        const name = r.ext ? `${r.ext} ${r.breed}` : r.breed;
        const path = r.ext ? `${r.breed}/${r.ext}` : `${r.breed}/`;
        ar.push({ name, path });
      });
      setDogs((prev) => prev.concat(ar));
    };
    fetchDogs();
  }, []);

  const options =
    input.trim().length > 0
      ? dogs.filter((dog) => dog.name.includes(input))
      : [];

  return (
    <div>
      <input
        className="text-black"
        type="text"
        value={input}
        onChange={(e) => setInput(() => e.target.value)}
      />
      {options.map((dog) => (
        <option
          key={nanoid()}
          onClick={() => setInput(() => dog.name)}
          className="cursor-pointer"
        >
          {dog.name}
        </option>
      ))}
    </div>
  );
}
