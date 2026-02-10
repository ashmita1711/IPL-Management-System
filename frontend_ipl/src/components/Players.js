import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../api';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [playersRes, teamsRes] = await Promise.all([
          apiService.getAllPlayers(),
          apiService.getAllTeams()
        ]);
        setPlayers(playersRes.data);
        setTeams(teamsRes.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch players');
        console.error('Error fetching players:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const getTeamName = (teamId) => {
  //   const team = teams.find(t => t.teamId === teamId);
  //   return team ? team.name : `Team ${teamId}`;
  // };

  const getPlayerRoleClass = (role) => {
    switch (role?.toLowerCase()) {
      case 'batsman': return 'player-role bat';
      case 'bowler': return 'player-role bowl';
      case 'all-rounder': return 'player-role all-rounder';
      case 'wicket-keeper': return 'player-role wicket-keeper';
      default: return 'player-role';
    }
  };

const filteredPlayers = players.filter(player => {
  const matchesSearch = player.playerName?.toLowerCase().includes(searchTerm.toLowerCase());
  
  let matchesRole = true;
  if (roleFilter !== 'all') {
    const roleMapping = {
      'batsman': 'bat',
      'bowler': 'bowl', 
      'all-rounder': 'all_rounder',
      'wicket-keeper': 'wicket_keeper' 
    };
    
    const backendRole = roleMapping[roleFilter];
    // Use roleOfPlayer instead of role
    matchesRole = player.roleOfPlayer === backendRole;
  }
  
  return matchesSearch && matchesRole;
});

  if (loading) {
    return <div className="loading">Loading players...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h1 className="page-title">IPL Players</h1>
      
      
      {/* Search and Filter */}
      
      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search players by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            <option value="batsman">Batsman</option>
            <option value="bowler">Bowler</option>
            <option value="all-rounder">All-Rounder</option>
            <option value="wicket-keeper">Wicket-Keeper</option>
          </select>
        </div>
      </div>
      
      <div className="card-grid">
        {filteredPlayers.map((player) => (
          <div key={player.playerId} className="card player-card">
            <div className="player-photo">
              {player.name?.substring(0, 2).toUpperCase() || 'P'}
            </div>
            <div className="card-title">
              {player.playerName}
            </div>
            <div className="card-content">
              <div className="detail-item">
                <span className="detail-label">Role:</span>
                <span className={getPlayerRoleClass(player.roleOfPlayer)}>
                  {player.role || 'N/A'}
                </span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Nationality:</span>
                <span className="detail-value">{player.nationality || 'N/A'}</span>
              </div>
      
              <div className="detail-item">
                <span className="detail-label">Batting Style:</span>
                <span className="detail-value">{player.battingStyle || 'N/A'}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Bowling Style:</span>
                <span className="detail-value">{player.ballingStyle || 'N/A'}</span>
              </div>
              
              <Link 
                to={`/player/${player.playerId}`} 
                className="btn"
              >
                View Player Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPlayers.length === 0 && (
        <div className="card">
          <div className="card-content">
            <p>No players found matching your criteria.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Players;