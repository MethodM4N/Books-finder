import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchBookById } from '../../api/booksApi';
import { TVolumeInfo } from '../../types/types';

import { observer } from 'mobx-react-lite';
import searchSlice from '../../store/filterSlice';

import './bookInfo.scss';

const BookInfo: React.FC = observer(() => {
  const [book, setBook] = useState<TVolumeInfo>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      fetchBookById(id)
        .then((book) => {
          if (book.volumeInfo.title == undefined) {
            alert('Произошла ошибка, книга не найдена, вы будете переведены на главную страницу');
            navigate('/');
          }
          setBook(book.volumeInfo);
        })
        .catch((e) => {
          console.log(e);
          alert('Произошла ошибка, книга не найдена, вы будете переведены на главную страницу');
          navigate('/');
        });
    }
  }, []);

  return (
    <>
      <div className="bookInfo-container">
        <div>
          {book?.imageLinks ? (
            <img src={book.imageLinks.thumbnail} alt="Book" />
          ) : (
            <label>Изображение отсутствует</label>
          )}
        </div>
        <div>
          <p>{book?.categories ? book.categories : 'Категория отсутствует'}</p>
          <h4>{book?.publishedDate ? book.publishedDate.substr(0, 4) : ''}</h4>
          <h1>{book?.title ? book.title : ''}</h1>
          <h4>{book?.authors ? book.authors : 'Информация о авторах отсутствует'}</h4>
          <h4>{book?.description ? book.description : 'Описание отсутствует'}</h4>
        </div>
      </div>
      <Link className="bookInfo-container__link" to="/">
        <button
          className="bookInfo-container__back-button"
          onClick={() => searchSlice.setCategoryValue('All')}>
          Вернуться назад
        </button>
      </Link>
    </>
  );
});

export default BookInfo;
