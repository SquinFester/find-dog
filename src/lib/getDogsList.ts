import axios from "axios";

type DogsList = {
  message: {
    [breed: string]: string[];
  };
  status: string;
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
        const params = { breed: key, ext: element };
        dogsList.push({ name, link, params });
      });
    }

    dogsList.push({ name: key, link: key, params: { breed: key } });
  }

  return dogsList;
}

// check it: if i make couple getDog but one for link another for params will it fetch more data

// .join this array "/" and return instead of link
