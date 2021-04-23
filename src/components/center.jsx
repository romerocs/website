import React from 'react';

const Center = ({ tag = 'div', maxWidth = false, align = false, children }) => {

  const style = {
    '--cr-max-width': maxWidth ? `var(${maxWidth})` : false,
    '--cr-align': align ? align : false
  };

  return (
    <div className={'l-center'} style={{ ...style }}>
      {children}
    </div>
  );
};

export default Center;
