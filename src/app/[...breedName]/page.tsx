import getDogsList from "@/lib/getDogsList";

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

export default function DogImg({ params: { breedName } }: Props) {
  return <div>{breedName[0]}</div>;
}
