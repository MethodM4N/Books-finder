import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import { observer } from 'mobx-react-lite';
import booksSlice from './store/booksSlice';

import BookItem from './components/BookItem/BookItem';
import Header from './components/Header/Header';
import searchSlice from './store/filterSlice';
import Skeleton from './components/UI/Skeleton';

const App: React.FC = observer(() => {
  const [startIndex, setStartIndex] = useState(10);
  const skeletonArray = [...new Array(10)];
  const search = searchSlice.searchValue ? searchSlice.searchValue : `JS`;
  const sort = searchSlice.sortValue;
  const category = searchSlice.categoryValue;
  const firstMount = useRef(true);

  const handleMoreButton = () => {
    setStartIndex(startIndex + 30);
    booksSlice.getMoreBooks(search, startIndex, sort, category);
  };

  useEffect(() => {
    if (!firstMount.current) {
      if (category !== 'All') {
        booksSlice.sortBooksByCategory(category);
      } else {
        booksSlice.getBooks(search);
      }
    }
  }, [category]);

  useEffect(() => {
    setStartIndex(10);
    booksSlice.getInitialBooks(search);

    firstMount.current = false;
  }, [search]);

  useEffect(() => {
    if (sort === 'Newest') {
      booksSlice.sortBooks();
    } else {
      booksSlice.getBooks(search);
    }
  }, [sort]);

  return (
    <div className="App">
      <Header />
      {booksSlice.apiStatus == 'success' && booksSlice.totalBooks > 0 && (
        <p className="App__find-value">
          По запросу <span>"{search}"</span> найдено книг: {booksSlice.totalBooks} шт
        </p>
      )}
      <section className="books-container">
        {booksSlice.apiStatus == 'error' ? (
          <div>
            <h1>Произошла непредвиденная ошибка.</h1>
            <label>
              Мы уже занимаемся этим вопросом, попробуйте повторить попытку немного позднее.
            </label>
          </div>
        ) : booksSlice.totalBooks > 0 ? (
          booksSlice.books.map((obj) => <BookItem key={obj.id} {...obj} />)
        ) : null}
        {booksSlice.apiStatus == 'loading' && skeletonArray.map((_, i) => <Skeleton key={i} />)}
      </section>
      {booksSlice.apiStatus == 'success' && booksSlice.totalBooks === 0 && (
        <h1 className="App__find-value">По вашему запросу книг не найдено</h1>
      )}
      {booksSlice.apiStatus == 'success' && booksSlice.totalBooks > 0 && (
        <button className="App__more-button" onClick={handleMoreButton}>
          Ещё
        </button>
      )}
    </div>
  );
});

export default App;
