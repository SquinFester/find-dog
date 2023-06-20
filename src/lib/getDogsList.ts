import axios from "axios";

type DogsList = {
  message: {
    [breed: string]: string[];
  };
  status: string;
};

export default async function getDogsList() {
  try {
    const dogs = (await axios<DogsList>("https://dog.ceo/api/breeds/list/all"))
      .data.message;

    const dogsList: DogSpec[] = [];

    for (const key in dogs) {
      const ext = dogs[key];

      if (ext.length > 0) {
        ext.forEach((element: string) => {
          dogsList.push({ breed: key, ext: element });
        });
      } else {
        dogsList.push({ breed: key });
      }
    }

    return dogsList;
  } catch (error) {
    throw new Error("somehing went wrong");
  }
}
