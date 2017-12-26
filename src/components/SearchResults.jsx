import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/SearchResults.css';

class SearchResults extends Component {
  render() {
    // const imageLink = `https://media.kitsu.io/anime/poster_images/`;
    return (
      <ul className='formResults'>
        {this.props.results.map((element, index) => {
          return(
            <li key={index} onClick={this.handleClick}>
              <Link to={`/anime/${this.props.results[index].id}`} >
                <img src={this.props.results[index].attributes.posterImage.original === null 
                  ? 'http://via.placeholder.com/640x960' 
                  : `${this.props.results[index].attributes.posterImage.original}`} 
                  alt={`${this.props.results[index].attributes.canonicalTitle} poster`} className='resultPoster' />
                <div>
                  <p>{this.props.results[index].attributes.canonicalTitle}</p>
                  <p>{this.props.results[index].attributes.startDate}</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    );
  }
}

export default SearchResults;