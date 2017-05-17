import React, { Component } from 'react';
import api from '../utils/api';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';


function Profile({ info }) {
  return (
    <PlayerPreview
      username={info.login}
      avatar={info.avatar_url}>
        <ul className='space-list-items'>
          {info.name && <li>{info.name}</li>}
          {info.location && <li>{info.location}</li>}
          {info.company && <li>{info.company}</li>}
          <li>Followers: {info.followers}</li>
          <li>Following: {info.following}</li>
          <li>Public Repos: {info.public_repos}</li>
          {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
        </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player(props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{'textAlign': 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile}/>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }

  componentDidMount() {
    const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);
    api.battle([
      playerOneName,
      playerTwoName
    ]).then((results) => {
      if (results === null) {
        return this.setState(() => {
          return {
            error: 'Looks like there was an error. Check that both users exist in Github.',
            loading: false
          };
        });
      } else {
        this.setState(() => {
          return {
            error: null,
            winner: results[0],
            loser: results[1],
            loading: false 
          };
        });
      }
    });
  }

  render() {
    const { 
      error,
      winner,
      loser,
      loading
    } = this.state;

    if (loading) {
      return <p>Loading...</p>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile} 
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile} 
        />
      </div>
    )
  }
}

export default Results;