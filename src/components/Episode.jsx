import React, { Component } from 'react';
import Search from './Search.jsx';
import Navbar from './Navbar.jsx';

// import { Player } from 'video-react';

import '../css/Episode.css'

var AnimeApi = require('./Scraper.js')
const client = new AnimeApi();


class Episode extends Component {
  state = {
    animes: {
      attributes: {

      }
    },
    mappings: {
      attributes: {

      }
    },
    episodeLink: ''
  }

  getData = () => {
    var pathArray = window.location.pathname.split( '/' );
    var secondLevelLocation = pathArray[2];
    var thirdLevelLocation = pathArray[3];
    // console.log(thirdLevelLocation);
    // console.log(secondLevelLocation);

    fetch(`https://kitsu.io/api/edge/anime/${secondLevelLocation}/mappings`)
    .then(response => {
      if (response.status !== 200) {
        console.log('Error: ' + response.status);
        return;
      }

      response.json().then(data => {
        const mappings = data.data;
        this.setState({ mappings });
        // console.log(mappings)
      });

    })
    .catch(err => {
      console.log('Fetch Error :-S', err);
    })

    fetch(`https://kitsu.io/api/edge/anime/${secondLevelLocation}`)
    .then(response => {
      if (response.status !== 200) {
        console.log('Error: ' + response.status);
        return;
      }

      response.json().then(data => {
        const animes = data.data;
        this.setState({ animes });

        client.getEpisodes(this.state.animes.attributes.slug)
        .then(eps => eps[thirdLevelLocation].getEpisode())
        .then(vids => {
          // console.log(vids)
          const episodeLink = vids
          this.setState({ episodeLink })
          // console.log(episodeLink)

        });
        // client.search(this.state.animes.attributes.slug)
        //   .then(res => {
        //     for(let i = 0; i < res.length; i++) {
        //       if(Number(res[i].mal_id) == Number(this.state.mappings[0].attributes.externalId)) {
        //         return res.find(x => x.type === "TV")
        //         .getEpisodes();
        //       }
        //     }
        //   })
        //   .then(eps => eps[thirdLevelLocation].getEpisode())
        //   .then(eps => {
        //     const episodeLink = eps[0].src
        //     this.setState({ episodeLink})
        //     console.log(episodeLink)
        //   });
      });
    })
    .catch(err => {
      console.log('Fetch Error :-S', err);
    })
  }
  
  componentDidMount() {
    this.getData();
    // this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    //   console.log('onPlayerReady', this)
    // });
  }

  // componentWillUnmount() {
  //   if (this.player) {
  //     this.player.dispose()
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if(nextProps.animes !== this.state.animes) {
      this.getData();
    }
    if(nextProps.mappings !== this.state.mappings) {
      this.getData();
    }
    if(nextProps.episodeLink !== this.state.episodeLink) {
      this.getData();
    }
  }

  render() {
    var epLink = this.state.episodeLink
    return (
      <div className='episodeContainer'>
        <Navbar />
        <Search className='searchContent' />

        <div className='episodeContent'>
          <h3>{this.state.animes.attributes.canonicalTitle}</h3>
          {/* <div className='episodePlayer' data-vjs-player>
            <video
              id='my-player'
              className='video-js'
              controls
              preload='auto'
              poster='//vjs.zencdn.net/v/oceans.png'
              data-setup='{}'>
                <source src={epLink} type='video/mp4'></source>
                <p className='vjs-no-js'>
                  To view this video please enable JavaScript, and consider upgrading to a
                  web browser that
                  <a href='http://videojs.com/html5-video-support/' target='_blank' rel='noopener noreferrer'>
                    supports HTML5 video
                  </a>
                </p>
            </video>
          </div> */}
          <div className='video'>
            <iframe width='100%' height='360'src={epLink} title='animeEpisode'/>
          </div>
        </div>
      </div>
    );
  }
}

export default Episode;