import React from 'react';

const NotFooter = ({ children }) => {
  return (
    <div className='l-stack not-footer' style={{ '--st-space': 'var(--vertical-rhythm)' }}>
      {children}
    </div>
  );
};

export default NotFooter;