import React from 'react';
import { Link } from "gatsby";

const Card = (({ title, slug }) => {

  return (
    <article className='card'>
      <h3>
        <Link to={slug}>
          {title}
        </Link>
      </h3>
    </article>
  );
});

export default Card;