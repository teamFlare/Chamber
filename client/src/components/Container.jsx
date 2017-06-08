import Header from './Header.jsx';
import React from 'react';
const Container = (props) => {
    return (
      <div>
        <Header/>
        {props.children}
      </div>
    );
  
}

export default Container;
