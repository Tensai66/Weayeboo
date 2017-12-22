import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import Search from './Search.jsx';

import '../css/Anime.css';

class Anime extends Component {
  state = {
    anime: {
      attributes: {
        posterImage: []
      }
    }
  }

  getData = () => {
    const animeId = window.location.pathname.substring(7);
    // console.log(animeId);
    fetch(`https://kitsu.io/api/edge/anime/${animeId}`)
    .then(response => {
      if (response.status !== 200) {
        console.log('Error: ' + response.status);
        return;
      }

      response.json().then(data => {
        const anime = data.data;
        this.setState({ anime });
        console.log(anime);
        // console.log(this.state.anime.attributes.posterImage.original);
      });

    })
    .catch(err => {
      console.log('Fetch Error :-S', err);
    })
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.anime !== this.state.anime) {
      this.getData();
    }
  }

  render() {
    return (
      <div className="animeContainer">
        <Navbar />
        <Search className="searchContent" />

        <div className="animeContent">
          <div className="animePoster">
            <img src={this.state.anime.attributes.posterImage.original === null 
              ? 'http://via.placeholder.com/640x960' 
              : `${this.state.anime.attributes.posterImage.original}`} 
              alt={`${this.state.anime.attributes.canonicalTitle} poster`} className="animeImg" />
            <h2 className="animeTitle">{this.state.anime.attributes.canonicalTitle}</h2>
          </div>

          <section className="animeDetails">
            <div className="ytPlayer ytContainer16x9 ytContainer4x3">
              <iframe src={`https://www.youtube.com/embed/${this.state.anime.attributes.youtubeVideoId}`} title="animetrailer"></iframe>;
            </div>
            <ul className="animeDetails">
              <li><span className="weight">Release date:</span> {this.state.anime.attributes.startDate}</li>
              <li><span className="weight">Rating:</span> {this.state.anime.attributes.averageRating}/100</li>

              {/* <li><span className="weight">Genres: </span> {this.state.anime.genres.map((element, index) => {
                  if (index < this.state.anime.genres.length - 1) {
                    return this.state.anime.genres[index].name + ', '
                  } else {
                    return this.state.anime.genres[index].name
                  }
                })}
              </li> */}
              <li><span className="weight">Overview:</span> {this.state.anime.attributes.synopsis}</li>
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

export default Anime;