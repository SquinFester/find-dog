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
  const [visable, setVisable] = useState<boolean>(false);

  // fetch list of dogs and set them in dog list
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

  //fetch image base on user's input
  const fetchImg = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(() => true);
    setError(() => false);

    //convert user's input to another format
    const conv = input
      .toLocaleLowerCase()
      .split(" ")
      .reverse()
      .filter((i) => i !== "");

    //get src and name to display photo
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

  const options =
    input.trim().length > 0
      ? dogs.filter((dog) => dog.name.includes(input))
      : dogs;

  return (
    <main className=" text-lg">
      <form
        className="flex flex-col items-center justify-center gap-10 py-10 md:flex-row"
        onSubmit={(e) => fetchImg(e)}
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between rounded-md border-2 border-solid border-primary p-2 text-black md:flex-row">
            <input
              className="w-full outline-none focus:outline-none active:outline-none"
              type="text"
              placeholder="type dog's breed..."
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
              <ul className="absolute top-0 z-10 flex max-h-96 w-full flex-col gap-1 overflow-y-scroll rounded-md border-2 bg-white px-1">
                {options.map((dog) => (
                  <li
                    key={nanoid()}
                    onClick={() => setInput(() => dog.name)}
                    className="group cursor-pointer border-b-2 py-2 pl-2 last:border-none hover:bg-neutral-200"
                  >
                    <button className="group-hover:font-semibold">
                      {dog.name}
                    </button>
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
          <div className="flex flex-col items-center gap-2 py-10">
            <Image src={photo.src} alt={photo.name} width={500} height={500} />
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
