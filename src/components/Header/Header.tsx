import React, { useState } from 'react';
import SearchIco from '../../img/magnifier-svgrepo-com.svg';

import { observer } from 'mobx-react-lite';
import searchSlice from '../../store/filterSlice';

import './header.scss';

const category = ['All', 'Art', 'Biography', 'Computers', 'History', 'Medicine', 'Poetry'];
const sort = ['Relevance', 'Newest'];

const Header: React.FC = observer(() => {
  const [localSearchValue, setLocalSearchValue] = useState<string>('');

  const handleSearchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    searchSlice.setSearchValue(localSearchValue);
    searchSlice.setCategoryValue('All');
    searchSlice.setSortValue('Relevance');
    setLocalSearchValue('');
  };

  const onCategoryChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchSlice.setCategoryValue(event.target.value);
  };

  const onSortChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchSlice.setSortValue(event.target.value);
  };

  return (
    <section className="header-container">
      <h1>Search for books</h1>
      <form className="header-container__form" onSubmit={handleSubmit}>
        <input
          value={localSearchValue}
          onChange={handleSearchContent}
          placeholder="Введите название книги"></input>
        <button>
          <img src={SearchIco} />
        </button>
      </form>
      <div className="header-container__flex">
        <span>Категории:</span>
        <select onChange={onCategoryChangeHandler} value={searchSlice.categoryValue}>
          {category.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
        <span>Отсортировать по:</span>
        <select onChange={onSortChangeHandler} value={searchSlice.sortValue}>
          {sort.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </div>
    </section>
  );
});

export default Header;
