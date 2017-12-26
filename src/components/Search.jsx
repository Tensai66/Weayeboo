import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';

import SearchResults from './SearchResults';

import '../css/Search.css';

class Search extends Component {
  state = {
    search: '',
    results: []
  }

  onChange = (e) => {
    this.setState({[e.target.name]: [e.target.value]})

    if(e.target.value !== ''){
      fetch(`https://kitsu.io/api/edge/anime?filter[text]=${e.target.value}`)
      .then(response => {
        if (response.status !== 200) {
          console.log('Error: ' + response.status);
          return;
        }
        response.json().then(data => {
          const results = data.data;
          this.setState({ results });
          // console.log(results);
        });
      })
      .catch(err => {
        console.log('Fetch error :-S', err)
      })  
    }

    if(e.target.value === '') {
      this.setState({ results: []});
    }
  }

  render() {
    return (
        <div className="searchBarContainer">
          <form className="searchContent">
            <DebounceInput
              type="text"
              onChange={this.onChange}
              // minLength={5}
              debounceTimeout={300}
              value={this.state.search}
              className="searchBar"
              placeholder="Search an anime title..."
              name="search" required />
            <SearchResults results={this.state.results} />
          </form>
        </div>
    );
  }
}

export default Search;