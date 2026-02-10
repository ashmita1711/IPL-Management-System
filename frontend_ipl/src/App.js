import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Seasons from './components/Seasons';
import SeasonDetail from './components/SeasonDetail';
import MatchDetail from './components/MatchDetail';
import TeamDetail from './components/TeamDetail';
import PlayerDetail from './components/PlayerDetail';
import Teams from './components/Teams';
import Players from './components/Players';
import AddSeason from './components/AddSeason';
import AddTeam from './components/AddTeam';
import AddMatch from './components/AddMatch';
import AddPlayer from './components/AddPlayer';
import Navbar from './Navbar';
import ChatBot from "./components/chat/ChatBot";

function App() {
  return (
    <Router>
      <div className="App">
        < Navbar/>
        {/* <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              IPL Tournament
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Seasons</Link>
              </li>
              <li className="nav-item">
                <Link to="/teams" className="nav-link">Teams</Link>
              </li>
              <li className="nav-item">
                <Link to="/players" className="nav-link">Players</Link>
              </li>
              <li className="nav-item">
                <Link to="/umpires" className="nav-link">Umpires</Link>
              </li>
            </ul>
          </div>
        </nav> */}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Seasons />} />
            <Route path="/season/:seasonYear" element={<SeasonDetail />} />
            <Route path="/match/:matchId" element={<MatchDetail />} />
            <Route path="/team/:teamId" element={<TeamDetail />} />
            <Route path="/player/:playerId" element={<PlayerDetail />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/players" element={<Players />} />
            <Route path="/add-season" element={<AddSeason />} />
            <Route path="/add-team" element={<AddTeam />} />
            <Route path="/add-match" element={<AddMatch />} />
            <Route path="/add-player" element={<AddPlayer />} />
          </Routes>
        </main>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;