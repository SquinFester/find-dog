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
  const [error, setError] = useState(false);

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
    setError(() => false);
    const conv = input
      .toLocaleLowerCase()
      .split(" ")
      .reverse()
      .filter((i) => i !== "");

    const getSrc = await getDogImg(conv);
    if (getSrc.status === "success") {
      setSrc(() => getSrc.message);
    } else {
      setSrc(() => "");
      setError(() => true);
    }
  };

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
      <button onClick={() => fetchImg()}>Search</button>
      {src.length > 0 && (
        <Image src={src} alt="dog's img" width={500} height={500} />
      )}
      {error && <p>Error</p>}
    </div>
  );
}
