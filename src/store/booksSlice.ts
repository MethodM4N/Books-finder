import { action, makeAutoObservable } from 'mobx';
import { fetchBooks } from '../api/booksApi';
import { TBook } from '../types/types';
import { totalmem } from 'os';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

class booksSlice {
  books: TBook[] = [];
  totalBooks = 0;
  apiKey = '';
  apiStatus = Status.LOADING;

  constructor() {
    makeAutoObservable(this);
  }

  getInitialBooks(search: string) {
    this.apiStatus = Status.LOADING;
    this.books = [];
    fetchBooks(this.apiKey, search)
      .then(
        action((books) => {
          this.totalBooks = books.totalItems;
          this.books = books.items;
        }),
      )
      .then(
        action(() => {
          this.apiStatus = Status.SUCCESS;
        }),
      )
      .catch(
        action(() => {
          this.apiStatus = Status.ERROR;
        }),
      );
  }

  getBooks(search: string) {
    this.apiStatus = Status.LOADING;
    const maxResult = this.books.length < 10 ? 10 : this.books.length < 40 ? this.books.length : 40;

    fetchBooks(this.apiKey, search, 0, maxResult)
      .then(
        action((books) => {
          this.books = [];
          this.books = books.items;
          this.totalBooks = books.totalItems;
        }),
      )
      .then(
        action(() => {
          this.apiStatus = Status.SUCCESS;
        }),
      )
      .catch(
        action(() => {
          this.apiStatus = Status.ERROR;
        }),
      );
  }

  getMoreBooks(search: string, startIndex: number, sort: string, category: string) {
    this.apiStatus = Status.LOADING;
    fetchBooks(this.apiKey, search, startIndex, 30)
      .then(
        action((books) => {
          this.books = [...this.books, ...books.items];
        }),
      )
      .then(
        action(() => {
          this.apiStatus = Status.SUCCESS;
        }),
      )
      .catch(
        action(() => {
          this.apiStatus = Status.ERROR;
        }),
      )
      .finally(() => {
        if (sort === 'Newest') {
          this.sortBooks();
        }
        if (category !== 'All') {
          this.sortBooksByCategory(category);
        }
      });
  }

  sortBooks() {
    const sortedBooks = this.books;

    sortedBooks
      // @ts-ignore
      .sort((a, b) => {
        if (a.volumeInfo.publishedDate === undefined || b.volumeInfo.publishedDate === undefined) {
          return;
        }
        let aYear = a.volumeInfo.publishedDate.substr(0, 4);
        let bYear = b.volumeInfo.publishedDate.substr(0, 4);
        return Number(bYear) - Number(aYear);
      })
      .splice(-1, 1);
    this.books = sortedBooks;
  }

  sortBooksByCategory(category: string) {
    const sortedBooks = this.books.filter((book) => {
      if (book.volumeInfo.categories === undefined) {
        return;
      }
      return book.volumeInfo.categories[0].toLowerCase().includes(category.toLowerCase());
    });
    // В гугл апи нет метода по сортировке, если мы ничего не нашли
    // в существующем массиве книг на клиенте, то можно поидее начать подгружать
    // другие массивы книг, пока не найдем то что нам надо
    // но у гугл апи есть максимальное количество запросов в день и мы можем
    // в это ограничение упереться
    // if (sortedBooks.length === 0) {this.getMoreBooks()}

    this.books = sortedBooks;
    this.totalBooks = sortedBooks.length;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
}

export default new booksSlice();
