import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import Search from './Search.jsx';

import '../css/Anime.css';

class Anime extends Component {
  state = {
    anime: {
      genres: [],
      videos: {
        results: []
      }
    }
  }

  getData = () => {
    const animeId = window.location.pathname.substring(7);

    fetch(`https://kitsu.io/api/edge/anime/${animeId}`)
    .then(response => {
      if (response.status !== 200) {
        console.log('Error: ' + response.status);
        return;
      }

      response.json().then(data => {
        const anime = data;
        this.setState({ anime });
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
      <div className="movieContainer">
        <Navbar />
        <Search className="searchContent" />

        {/* <div className="movieContent">
          <div className="moviePoster">
            <img src={this.state.anime.attributes === null ? 'http://via.placeholder.com/640x960' : `https://image.tmdb.org/t/p/w640${this.state.movie.poster_path}`} alt={`${this.state.movie.title} poster`} className="movieImg" />
            <h2 className="movieTitle">{this.state.movie.title}</h2>
          </div>

          <section className="movieDetails">
            {this.state.movie.videos.results.length > 0 && 
              <div className="ytPlayer ytContainer16x9 ytContainer4x3">
                <iframe src={`https://www.youtube.com/embed/${this.state.movie.videos.results[0].key}`} title="movietrailer"></iframe>;
              </div>
            }
            <ul className="movieDetails">
              <li><span className="weight">Release date:</span> {this.state.movie.release_date}</li>
              <li><span className="weight">Rating:</span> {this.state.movie.vote_average}</li>

              <li><span className="weight">Genres: </span> {this.state.movie.genres.map((element, index) => {
                  if (index < this.state.movie.genres.length - 1) {
                    return this.state.movie.genres[index].name + ', '
                  } else {
                    return this.state.movie.genres[index].name
                  }
                })}
              </li>
            </ul>
            <p>{this.state.movie.overview}</p>
          </section>
        </div> */}
      </div>
    );
  }
}

export default Anime;