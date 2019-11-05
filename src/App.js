import React from 'react';
import './App.css';
import { Tabs } from './tabs/tabs';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Doggo Tab Demo</h1>
      </header>
      <div className="tab-display">
        <Tabs />
      </div>
    </div>
  );
};

export default App;
