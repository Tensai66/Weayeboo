import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import NavbarLogin from './NavbarLogin.jsx';
import '../css/Navbar.css'

// var Anime = require("animepill-api")

// const client = new Anime();
 
//   client.getEpisodes("bleach")
//   .then(eps => eps[3].getEpisode())
//   .then(vids => console.log(vids));

class Navbar extends Component {
  render() {
    return (
      <header>
        <Link to={'/'}><h1>Weayeboo</h1></Link>
        {/* <NavbarLogin /> */}
      </header>
    );
  }
}

export default Navbar;