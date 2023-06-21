"use client";
import { useState, useEffect } from "react";
import getDogImg from "@/lib/getDogImg";
import Image from "next/image";
import Loading from "@/app/loading";

const DogImage = ({ src, name }: DogImg) => {
  const [linkToImg, setLinkToImg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDogImg = async () => {
      setIsLoading(() => true);
      const res = await getDogImg(src);
      if (res.status === "success") {
        setLinkToImg(() => res.message);
      } else {
        setLinkToImg(() => "");
      }
      setIsLoading(() => false);
    };
    fetchDogImg();
  }, [src, name]);

  //create conent depend on loading and src
  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (linkToImg.length === 0) {
      return <p>Not found images for {name}</p>;
    } else {
      return (
        <>
          <Image
            src={linkToImg}
            alt={name}
            width={400}
            height={400}
            loading="lazy"
          />
          <h1>
            <span className="italic">{name}</span>&nbsp;😍
          </h1>
        </>
      );
    }
  };

  return (
    <div className="mb-10 mt-5 flex flex-col items-center gap-2 ">
      {content()}
    </div>
  );
};
export default DogImage;
