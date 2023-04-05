import { IBooks, TBook } from '../types/types';

export const fetchBooks = async (
  apiKey: string,
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
    return getResponseData(res);
  });
};

export const fetchBookById = async (id: string): Promise<TBook> => {
  return fetch(`https://www.googleapis.com/books/v1/volumes/${id}`).then((res) => {
    return getResponseData(res);
  });
};

function getResponseData(res: any) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(() => Promise.reject({ status: res.status, message: res.statusText }));
}
