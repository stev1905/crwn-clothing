import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div>
    <h1>Hats Page</h1>
  </div>
)


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact={true} path='/' component={HomePage} />
          <Route exact={true} path='/hats' component={HomePage} />
        </Switch>
      </div>
    )
  }
}

export default App;
