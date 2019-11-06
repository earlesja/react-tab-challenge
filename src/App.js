import React from 'react';
import './App.css';
import { Tabs } from './tabs/tabs';

const App = () => {
  return (
    <div className="App">
      <header className="App-header" role="banner">
        <h1 className="App-title">Doggo Tab Demo</h1>
      </header>
      <div className="tab-display" role="main">
        <Tabs />
      </div>
    </div>
  );
};

export default App;
