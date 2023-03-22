import React from 'react';

import './bookItem.scss';
import { TBook } from '../../types/types';
import { Link } from 'react-router-dom';

const BookItem: React.FC<TBook> = ({ volumeInfo, id }) => {
  return (
    <div className="bookItem-container">
      <div>
        {volumeInfo.imageLinks ? (
          <img src={volumeInfo.imageLinks.thumbnail} alt="Book" />
        ) : (
          <label>Изображение отсутствует</label>
        )}
        <p>{volumeInfo.categories ? volumeInfo.categories : ''}</p>
        <h4>{volumeInfo.publishedDate ? volumeInfo.publishedDate : ''}</h4>
        <Link to={`/book/${id}`}>
          <h1>{volumeInfo.title ? volumeInfo.title : ''}</h1>
        </Link>
      </div>
      <h4>{volumeInfo.authors ? volumeInfo.authors[0] : ''}</h4>
    </div>
  );
};

export default BookItem;
