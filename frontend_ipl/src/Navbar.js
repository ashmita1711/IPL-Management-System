// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <nav style={{ backgroundColor: '#1e2a38', padding: '1em' }}>
//       <Link style={{ color: 'white', marginRight: '1em' }} to="/seasons">Seasons</Link>
//       <Link style={{ color: 'white', marginRight: '1em' }} to="/teams">Teams</Link>
//       <Link style={{ color: 'white', marginRight: '1em' }} to="/players">Players</Link>
//       <Link style={{ color: 'white', marginRight: '1em' }} to="/umpires">Umpires</Link>
//       <Link style={{ color: 'white' }} to="/search">Search</Link>
//       <Link to="/add-season">Add Season</Link>
//       <Link to="/add-team">Add Team</Link>
//       <Link to="/add-match">Add Match</Link>
//       <Link to="/add-player">Add Player</Link>
//     </nav>
//   );
// }

// export default Navbar;


// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">IPL Tournament</div>
        <ul className="nav-menu">
          <li><Link to="/">Seasons</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/players">Players</Link></li>
          {/* <li><Link to="/umpires">Umpires</Link></li>
          <li><Link to="/search">Search</Link></li> */}
          <li><Link to="/add-season">Add Season</Link></li>
          <li><Link to="/add-team">Add Team</Link></li>
          <li><Link to="/add-match">Add Match</Link></li>
          <li><Link to="/add-player">Add Player</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
