import axios from 'axios';

// Use if several queries are going to be made
const id = 'YOUR_CLIENT_ID';
const sec = 'YOUR_SECRET_ID';
const params = `?client_id=${id}&client_secret=${sec}`;

function getProfile(username) {
  return axios
    .get(`https://api.github.com/users/${username}${params}`)
    .then(user => {
      return user.data;
    });
}

function getRepos(username) {
  return axios.get(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  );
}

function getStarCount(repos) {
  return repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);
  return followers * 3 + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  return axios
    .all([getProfile(player), getRepos(player)])
    .then(([profile, repos]) => {
      return {
        profile: profile,
        score: calculateScore(profile, repos)
      };
    });
}

function sortPlayers(players) {
  return players.sort((playerOne, playerTwo) => {
    return playerTwo.score - playerOne.score;
  });
}

export default {
  battle: players => {
    return axios
      .all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },

  fetchPopularRepos: language => {
    const encodedURI = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );
    return axios.get(encodedURI).then(response => {
      return response.data.items;
    });
  }
};
