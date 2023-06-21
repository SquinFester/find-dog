"use client";

import getDogsList from "@/lib/getDogsList";
import { nanoid } from "nanoid";
import { FormEvent, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import DogImage from "@/components/DogImage";

type DogOption = {
  name: string;
};

export default function Search() {
  const [dogs, setDogs] = useState<DogOption[]>([]);
  const [input, setInput] = useState<string>("");
  const [photo, setPhoto] = useState<DogImg>({ src: [], name: "" });
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

    //convert user's input to another format
    const conv = input
      .toLocaleLowerCase()
      .split(" ")
      .filter((i) => i !== "")
      .reverse();

    setPhoto(() => ({ src: conv, name: input }));

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
              onChange={(e) => {
                setInput(() => e.target.value);
                setVisable(() => true);
              }}
            />
            <button
              type="button"
              className={`text-xl  text-primary ${
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
          className="w-full rounded-md border-2 border-solid border-primary bg-primary py-2 text-white transition hover:bg-secondary md:w-1/2"
        >
          Search
        </button>
      </form>

      {photo.src.length > 0 && <DogImage src={photo.src} name={photo.name} />}
    </main>
  );
}
