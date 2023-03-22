import React from 'react';
import ContentLoader from 'react-content-loader';

import '../../components/BookItem/bookItem.scss';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="bookItem-container"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 260 501"
    backgroundColor="#f2f2f2"
    foregroundColor="#dcddd2"
    {...props}>
    <rect x="42" y="28" rx="0" ry="0" width="189" height="280" />
    <rect x="27" y="335" rx="0" ry="0" width="53" height="15" />
    <rect x="139" y="443" rx="0" ry="0" width="1" height="0" />
    <rect x="27" y="374" rx="0" ry="0" width="124" height="44" />
  </ContentLoader>
);

export default Skeleton;
