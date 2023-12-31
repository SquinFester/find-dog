import axios from "axios";

export default async function getDogImg(breed: string[]) {
  try {
    return (
      await axios.get<DogImgPromise>(
        `https://dog.ceo/api/breed/${breed.join("/")}/images/random`
      )
    ).data;
  } catch (error) {
    return {
      message: "dog's images are not found",
      status: "failed",
    };
  }
}
