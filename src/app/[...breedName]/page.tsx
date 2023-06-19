import getDogImg from "@/lib/getDogImg";
import getDogsList from "@/lib/getDogsList";
import Image from "next/image";
import { Suspense } from "react";

export const generateStaticParams = async () => {
  const breeds: DogSpec[] = await getDogsList();

  return breeds.map((breed) => {
    if (breed.ext !== undefined) {
      return {
        breedName: [breed.breed, breed.ext],
      };
    }
    return {
      breedName: [breed.breed],
    };
  });
};

type Props = {
  params: {
    breedName: string[];
  };
};

export default async function DogImg({ params: { breedName } }: Props) {
  const { message: src }: DogImg = await getDogImg(breedName);

  const name = breedName.join(" ");

  return (
    <div>
      {name}
      <Suspense fallback={<p>Loading..</p>}>
        <Image src={src} alt={name} width={300} height={300} loading="lazy" />
      </Suspense>
    </div>
  );
}
