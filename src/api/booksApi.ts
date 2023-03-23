import { IBooks, TBook } from '../types/types';

const apiKey = 'AIzaSyCAA-lIye0CJ8WoBfyN1M7NpYVJTvOdmm0';

export const fetchBooks = async (
  searchValue: string,
  startIndex = 0,
  maxResult = 10,
): Promise<IBooks> => {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?
q=${searchValue}
&key=${apiKey}
&maxResults=${maxResult}
&startIndex=${startIndex}
`,
  ).then((res) => {
    return res.json();
  });
};

export const fetchBookById = async (id: string): Promise<TBook> => {
  return fetch(`https://www.googleapis.com/books/v1/volumes/${id}`).then((res) => {
    return res.json();
  });
};
