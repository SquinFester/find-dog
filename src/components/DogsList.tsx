"use client";

import getDogsList from "@/lib/getDogsList";
import ListItem from "./ListItem";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const fetchDogs = async (page: number) => {
  const dogsData: DogSpec[] = await getDogsList();

  const start = (page - 1) * 5;
  const end = page * 5;

  const result = dogsData.slice(start, end);

  return result;
};

const DogsList = () => {
  const [dogsList, setDogsList] = useState<DogSpec[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const addNewDogs = async () => {
    const newDogs = await fetchDogs(currentPage);
    if (newDogs.length === 0) {
      setHasMore(() => false);
      return;
    }

    setDogsList((prev) => prev.concat(newDogs));
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    addNewDogs();
  }, []);

  return (
    <InfiniteScroll
      dataLength={DogsList.length}
      next={addNewDogs}
      hasMore={hasMore}
      loader={<p>Loading...</p>}
    >
      <ul className="flex flex-col gap-20">
        {dogsList.map((dog) => (
          <ListItem dogInfo={dog} key={nanoid()} />
        ))}
      </ul>
    </InfiniteScroll>
  );
};
export default DogsList;
