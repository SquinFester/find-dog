import Loading from "@/app/loading";
import DogImage from "@/components/DogImage";
import getDogsList from "@/lib/getDogsList";
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

export default async function DogImgPage({ params: { breedName } }: Props) {
  const name = breedName.join(" ");

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <DogImage src={breedName} name={name} />
      </Suspense>
    </main>
  );
}
