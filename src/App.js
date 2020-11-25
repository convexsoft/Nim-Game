import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Gamestatus from './components/gamestatus';
import Game from './components/game';
import {BrowserRouter, Route} from 'react-router-dom'

const PrimaryLayout = () => (
    <main>
        <BrowserRouter>
            <Route path="/" exact component={Gamestatus} />
            <Route path="/play" component={Game} />
        </BrowserRouter>
    </main>
)
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Navbar />
      </header>
        <PrimaryLayout />
    </div>
  );
}

export default App;
