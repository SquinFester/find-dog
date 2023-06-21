"use client";

import getDogsList from "@/lib/getDogsList";
import { nanoid } from "nanoid";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import getDogImg from "@/lib/getDogImg";
import { FaAngleDown } from "react-icons/fa";

type DogOption = {
  name: string;
};

type PhotoType = {
  src: string;
  name: string;
};

export default function Search() {
  const [dogs, setDogs] = useState<DogOption[]>([]);
  const [input, setInput] = useState<string>("");
  const [photo, setPhoto] = useState<PhotoType>({ src: "", name: "" });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();
  const [visable, setVisable] = useState<boolean>(true);

  useEffect(() => {
    const fetchDogs = async () => {
      const res: DogSpec[] = await getDogsList();
      const dogsForList: DogOption[] = [];
      res.map((dog) => {
        const name = dog.ext ? `${dog.ext} ${dog.breed}` : dog.breed;
        dogsForList.push({ name });
      });
      setDogs((prev) => prev.concat(dogsForList));
    };
    fetchDogs();
  }, []);

  const options =
    input.trim().length > 0
      ? dogs.filter((dog) => dog.name.includes(input))
      : [];

  const fetchImg = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(() => true);
    setError(() => false);
    const conv = input
      .toLocaleLowerCase()
      .split(" ")
      .reverse()
      .filter((i) => i !== "");

    const getSrc = await getDogImg(conv);
    if (getSrc.status === "success") {
      setPhoto(() => ({ src: getSrc.message, name: input }));
    } else {
      setPhoto(() => ({ src: "", name: input }));
      setError(() => true);
    }
    setLoading(() => false);
    setVisable(() => false);
  };

  return (
    <main className=" text-lg">
      <form
        className="my-10 flex flex-col items-center justify-center gap-10 md:flex-row"
        onSubmit={(e) => fetchImg(e)}
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between rounded-md border-2 border-solid border-primary p-2 text-black md:flex-row">
            <input
              className="w-full outline-none focus:outline-none active:outline-none"
              type="text"
              value={input}
              onChange={(e) => setInput(() => e.target.value)}
            />
            <button
              type="button"
              className={`text-xl ${
                visable ? "rotate-180" : "rotate-0 "
              } rounded-full `}
              onClick={() => setVisable((prev) => !prev)}
            >
              <FaAngleDown />
            </button>
          </div>
          {visable && options.length > 0 && (
            <div className="relative w-full">
              <ul className="absolute top-0 z-10 max-h-96 w-full overflow-y-scroll rounded-md bg-neutral-400 px-1">
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
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-md border-2 border-solid border-primary bg-primary py-2 text-white md:w-1/2"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        photo.src.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <Image src={photo.src} alt="dog's img" width={500} height={500} />
            <h1>
              <span className="italic">{photo.name}</span>&nbsp;😍
            </h1>
          </div>
        )
      )}

      {error && <p>{photo.name}'s img not found</p>}
    </main>
  );
}
