import axios from "axios";

export default async function getDogImg(breed: string[]) {
  try {
    return (
      await axios.get<DogImg>(
        `https://dog.ceo/api/breed/${breed.join("/")}/images/random`
      )
    ).data;
  } catch (error) {}
}
