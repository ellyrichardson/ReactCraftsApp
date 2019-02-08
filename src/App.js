import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Login from './_components/Login/Login';
import Home from './_components/Home/Home';
import Posts from './_components/Posts/Posts';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={Home}/>
          <Route exact path='/posts' component={Posts}/>
        </div>
      </Router>
    );
  }
}

export default App;
