"use client";

import getDogsList from "@/lib/getDogsList";
import ListItem from "./ListItem";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

const DogsList = () => {
  const [breeds, setBreeds] = useState<DogSpec[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getDogsList();

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const newDogs = data.slice(start, end);

    setBreeds((prev) => [...prev, ...newDogs]);
    setPage((prevPage) => prevPage + 1);
  };

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // Fetch more data when the bottom of the page is reached
      fetchData();
    }
  };

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <ul className="flex flex-col gap-20">
        {breeds.map((dog) => (
          <ListItem dogInfo={dog} key={nanoid()} />
        ))}
      </ul>
    </div>
  );
};
export default DogsList;
