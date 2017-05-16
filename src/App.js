import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Battle from './components/Battle';
import Popular from './components/Popular';
import Nav from './components/Nav';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/popular' component={Popular} />
            <Route render={() => {
              return (
                <p>Not Found</p>
              )
            }}/>
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;