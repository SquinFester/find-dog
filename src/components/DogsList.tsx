"use client";

import getDogsList from "@/lib/getDogsList";
import ListItem from "./ListItem";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const fetchDogs = async (page: number) => {
  const dogsData: DogSpec[] = await getDogsList();
  console.log(page);
  const start = (page - 1) * 5;
  const end = page * 5;

  const result = dogsData.slice(start, end);

  return result;
};

const DogsList = () => {
  const [DogsList, setDogsList] = useState<DogSpec[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addNewDogs = async () => {
    setIsLoading(() => true);
    const newDogs = await fetchDogs(currentPage);

    setDogsList((prev) => prev.concat(newDogs));
    setCurrentPage((prev) => prev + 1);
    setIsLoading(() => false);
  };

  useEffect(() => {
    addNewDogs();
  }, []);

  return (
    <InfiniteScroll
      dataLength={DogsList.length}
      next={addNewDogs}
      hasMore={true}
      loader={<p>Loading...</p>}
    >
      <ul className="flex flex-col gap-20">
        {DogsList.map((dog) => (
          <ListItem dogInfo={dog} key={nanoid()} />
        ))}
      </ul>
    </InfiniteScroll>
  );

  // return (
  //   <div>
  //     <ul className="flex flex-col gap-20">
  //       {DogsList.map((dog) => (
  //         <ListItem dogInfo={dog} key={nanoid()} />
  //       ))}
  //     </ul>
  //     {!isLoading ? (
  //       <button onClick={() => addNewDogs()}>more</button>
  //     ) : (
  //       <p>Loading</p>
  //     )}
  //   </div>
  // );
};
export default DogsList;
