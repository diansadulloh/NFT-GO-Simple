import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <Switch>
        <Route path='/nft-maker'></Route>
        <Route path='/art-maker'></Route>
        <Route path=''></Route>
      </Switch>
    </div>
  );
}

export default App;
