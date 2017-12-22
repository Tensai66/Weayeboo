import React, { Component } from 'react';
import Search from './Search.jsx';
import Navbar from './Navbar.jsx';
import AnimeSplash from './AnimeSplash.jsx';

import '../css/Home.css'

class Home extends Component {
  render() {
    return (
      <div className='homeContainer'>
        <Navbar />
        <Search />
        <AnimeSplash />
        
      </div>
    );
  }
}

export default Home;