import getDogImg from "@/lib/getDogImg";
import getDogsList from "@/lib/getDogsList";
import Image from "next/image";

export const generateStaticParams = async () => {
  const breeds: DogSpec[] = await getDogsList();

  return breeds.map((breed) => {
    if (breed.params.ext !== undefined) {
      return {
        breedName: [breed.params.breed, breed.params.ext],
      };
    }
    return {
      breedName: [breed.params.breed],
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

  return (
    <div>
      {breedName.join(" ")}
      <Image src={src} alt={breedName.join(" ")} width={500} height={500} />
    </div>
  );
}
