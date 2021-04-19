import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import LanguageChart from './components/language_chart'
import CopyToClipboard from './components/copy_to_clipboard';


function App() {
  return (
    <main>
       <div className="header">
        <Link to="/language-chart">Language Chart </Link>
        <Link to="/copy-to-clipboard">Copy To Clipboard </Link>
      </div>
      <Switch>
        <Route path="/language-chart" component={LanguageChart} />
        <Route path="/copy-to-clipboard" component={CopyToClipboard} />
        <Route path="/" component={LanguageChart}/>
      </Switch>
    </main>
  );
}

export default App;
