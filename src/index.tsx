import React from 'react';
import ReactDOM from 'react-dom/client';
// need to change BrowserRouter to HashRouter for gh-pages
import { HashRouter, Route, Routes } from 'react-router-dom';
import Favicon from 'react-favicon';
import favicon from './img/Book_25711.ico';

import App from './App';
import BookInfo from './components/BookInfo/BookInfo';
import Page404 from './components/Page404/Page404';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HashRouter>
    <Favicon url={favicon} />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="book/:id" element={<BookInfo />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </HashRouter>,
);
