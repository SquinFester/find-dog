"use client";

import getDogsList from "@/lib/getDogsList";
import { FormEvent, useEffect, useState } from "react";
import DogImage from "@/components/DogImage";
import InputForm from "@/components/InputForm";

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

  //render options depend on input
  const options =
    input.trim().length > 0
      ? dogs.filter((dog) => dog.name.includes(input.toLowerCase()))
      : dogs;

  return (
    <main className=" text-lg">
      <form
        className="flex flex-col items-center justify-center gap-10 py-10 md:flex-row"
        onSubmit={(e) => fetchImg(e)}
      >
        <InputForm
          value={input}
          inputHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(() => e.target.value);
            setVisable(() => true);
          }}
          toogleVisable={() => setVisable((prev) => !prev)}
          setInputClick={(name: string) => {
            setInput(() => name);
            setVisable(() => false);
          }}
          visable={visable}
          options={options}
        />

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
