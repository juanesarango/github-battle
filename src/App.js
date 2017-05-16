import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Battle from './components/Battle';
import Popular from './components/Popular';
import Nav from './components/Nav';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Route exact path='/' component={Home} />
          <Route path='/battle' component={Battle} />
          <Route path='/popular' component={Popular} />
        </div>
      </Router>

    );
  }
}

export default App;