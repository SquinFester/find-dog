import axios from "axios";

type DogsList = {
  message: {
    [breed: string]: string[];
  };
  status: string;
};

type DogSpec = {
  name: string;
  link: string;
};

export default async function getDogsList() {
  const dogs = (await axios<DogsList>("https://dog.ceo/api/breeds/list/all"))
    .data.message;

  const dogsList: DogSpec[] = [];

  for (const key in dogs) {
    const ext = dogs[key];

    if (ext.length > 0) {
      ext.forEach((element: string) => {
        const name = `${element} ${key}`;
        const link = `${key}/${element}`;
        dogsList.push({ name, link });
      });
    }

    dogsList.push({ name: key, link: key });
  }

  return dogsList;
}
