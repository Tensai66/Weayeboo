import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar.jsx';
import Search from './Search.jsx';

import '../css/Anime.css';

// const ipsum = 'Spicy jalapeno bacon ipsum dolor amet drumstick sirloin chuck shankle. Flank ribeye pancetta andouille ham hock. Turkey cow tenderloin landjaeger filet mignon hamburger. Pig tail strip steak pastrami t-bone venison bresaola biltong corned beef drumstick pork hamburger tri-tip. Tongue ham hock corned beef tri-tip meatball t-bone fatback andouille sirloin chuck jowl biltong pastrami. Ham hock ground round landjaeger tail strip steak. Ham sirloin pork loin salami spare ribs. Jerky cow short ribs ground round. Hamburger porchetta shankle meatloaf shank.';
class Anime extends Component {
  state = {
    anime: {
      attributes: {
        posterImage: [],
        coverImage: []
        // synopsis: ''
        // episodeCount: ''
      }
    },
    episodes: {
      data: []
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
        const anime = data.data;
        this.setState({ anime });
        // console.log(anime);
      });

    })
    .catch(err => {
      console.log('Fetch Error :-S', err);
    })

    fetch(`https://kitsu.io/api/edge/anime/${animeId}/relationships/episodes`)
    .then(response => {
      if (response.status !== 200) {
        console.log('Error: ' + response.status);
        return;
      }

      response.json().then(data => {
        const episodes = data;
        this.setState({ episodes });
        // console.log(episodes);
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
    const animeId = this.state.anime.id;
    // const synopsis = this.state.anime.attributes.synopsis;
    // console.log(synopsis)
    // var synopsis = this.state.anime.attributes.synopsis;
    return (
      <div className='animeContainer'>
        <Navbar />
        <Search className='searchContent' />

        <div className='animeContent'>
          {/* <div className='animePoster'>
            <img src={this.state.anime.attributes.posterImage.original === null 
              ? 'http://via.placeholder.com/640x960' 
              : `${this.state.anime.attributes.posterImage.original}`} 
              alt={`${this.state.anime.attributes.canonicalTitle} poster`} className='animeImg' />
            <h2 className='animeTitle'>{this.state.anime.attributes.canonicalTitle}</h2>
          </div> */}
          <div className='animeInfoContainer'>
            <img className='test' src={this.state.anime.attributes.coverImage.original} alt='anime cover'/>
            <h3 className='animeInfo'>Anime Info</h3>
            <section className='animeDetails'>
              {/* <div className='ytPlayer ytContainer16x9 ytContainer4x3'>
                <iframe src={`https://www.youtube.com/embed/${this.state.anime.attributes.youtubeVideoId}`} 
                title='animetrailer'></iframe>;
              </div> */}
              <ul className='animeDetails'>
                <li><span className='weight'>Release date:</span> {this.state.anime.attributes.startDate}</li>
                <li><span className='weight'>Rating:</span> {this.state.anime.attributes.averageRating}/100</li>
                <li><span className='weight'>Overview:</span> 
              
                {/* {this.state.anime.attributes.synopsis}  */}
                </li>
              </ul>
              <div className='episodeList'>
                <div><span className='weight'>Episodes:</span></div> {this.state.episodes.data.map((element, index) => {
                  if (index < this.state.episodes.data.length) {
                    return (
                      <div key={index}>
                      <Link className='episodes' to={`/anime/${animeId}/${index}`}>Episode {index}</Link>
                      </div>
                    )
                  } else {
                    return 'Error: No Episode Found'
                  }
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Anime;