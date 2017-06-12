import Header from './Header.jsx';
import React from 'react';
import Tag from './Tag.jsx';
import Footer from './Footer.jsx';
const Container = (props) => {
    return (
      <div>
        <Header/>
        {props.children}
        <Footer/>
      </div>
    );
  
}

export default Container;
