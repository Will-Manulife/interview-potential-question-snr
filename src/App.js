import React  from 'react';
import './App.css';
import CountrySearch from './components/country-search/index.js';
import 'h8k-components';

const title = "Country Search";

function App() {
  return (
    <div>
      <h8k-navbar header={title} />
      <CountrySearch/>
    </div>
  );
}

export default App;
