import { Link } from 'react-router-dom';

import './page404.scss';

function Page404() {
  return (
    <section className="page404">
      <h2 className="page404__title">404</h2>
      <h3 className="page404__info">Страница не найдена</h3>
      <Link className="page404__redirect-button" to="/">
        Назад
      </Link>
    </section>
  );
}

export default Page404;
