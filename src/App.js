import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainWeather from './components/MainWeather';
import NotFound from './components/NotFound';


class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={MainWeather}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </BrowserRouter>

    );
  }

}

export default App;
