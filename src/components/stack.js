import React from 'react';


const Stack = ({ margin = false, children }) => {
  const style = {
    '--st-margin': margin ? `var(${margin})` : false
  };

  return (
    <div className={'l-stack'} style={{ ...style }}>
      {children}
    </div>
  );
};

export default Stack;
