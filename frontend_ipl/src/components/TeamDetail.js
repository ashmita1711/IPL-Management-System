import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../api';

const TeamDetail = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [points, setPoints] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);

        const [teamRes, playersRes, matchesRes, pointsRes, teamsRes] = await Promise.all([
          apiService.getTeamById(teamId),
          apiService.getPlayersByTeam(teamId),
          apiService.getMatchesByTeam(teamId),
          apiService.getPointsByTeam(teamId),
          apiService.getAllTeams()
        ]);

        setTeam(teamRes.data);
        setPlayers(playersRes.data);
        setMatches(matchesRes.data);
        setPoints(pointsRes.data);
        setTeams(teamsRes.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch team data');
        console.error('Error fetching team data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  const getTeamName = (teamId) => {
    const team = teams.find(t => t.teamId === teamId);
    return team ? team.teamName : `Team ${teamId}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMatchResult = (match) => {
    if (!match.winnerTeamId) return 'No Result';
    const winnerName = getTeamName(match.winnerTeamId);
    if (match.winByRuns > 0) {
      return `${winnerName} won by ${match.winByRuns} runs`;
    } else if (match.winByWickets > 0) {
      return `${winnerName} won by ${match.winByWickets} wickets`;
    } else {
      return `${winnerName} won`;
    }
  };

  const getOpponentTeamId = (match) => {
    return match.team1Id === parseInt(teamId) ? match.team2?.teamId : match.team1?.teamId;
  };

  const getPlayerRoleClass = (role) => {
    switch (role?.toLowerCase()) {
      case 'batsman': return 'player-role bat';
      case 'bowler': return 'player-role bowl';
      case 'all-rounder': return 'player-role all_rounder';
      default: return 'player-role';
    }
  };

  
  const sortedMatches = matches.sort((a, b) => new Date(b.matchDate) - new Date(a.matchDate));

  if (loading) return <div className="loading">Loading team details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!team) return <div className="error">Team not found</div>;

  return (
    <div>
      <div className="detail-container">
        <div className="detail-header">
          <div className="team-logo">
            {team.teamName?.substring(0, 2).toUpperCase() || 'T'}
          </div>
          <h1 className="detail-title">{team.teamName }</h1>
          <p className="detail-subtitle">{team.city}</p>
        </div>

        <div className="detail-grid">
          <div className="detail-item"><span className="detail-label">Founded:</span><span className="detail-value">{team.foundedYear || 'N/A'}</span></div>
          <div className="detail-item"><span className="detail-label">Owner:</span><span className="detail-value">{team.owner_name || 'N/A'}</span></div>
          <div className="detail-item"><span className="detail-label">Coach:</span><span className="detail-value">{team.coach || 'N/A'}</span></div>
          <div className="detail-item"><span className="detail-label">Captain:</span><span className="detail-value">{team.captainId || 'N/A'}</span></div>
          <div className="detail-item"><span className="detail-label">Home Ground:</span><span className="detail-value">{team.homeGround || 'N/A'}</span></div>
          <div className="detail-item"><span className="detail-label">Total Players:</span><span className="detail-value">{players.length}</span></div>
        </div>
      </div>

      {points.length > 0 && (
        <div className="detail-container">
          <h2 className="detail-title">Season Performance</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={thStyle}>Season</th>
                  <th style={thStyle}>Matches</th>
                  <th style={thStyle}>Won</th>
                  <th style={thStyle}>Lost</th>
                  <th style={thStyle}>Points</th>
                  <th style={thStyle}>NRR</th>
                </tr>
              </thead>
              <tbody>
                {points.map((point) => (
                  <tr key={point.id.seasonYear}>
                    <td style={tdStyle}>
                      <Link to={`/season/${point.season.seasonYear}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                        IPL {point.season.seasonYear}
                      </Link>
                    </td>
                    <td style={tdCenter}>{point.matchesPlayed || 0}</td>
                    <td style={tdCenter}>{point.wins || 0}</td>
                    <td style={tdCenter}>{point.loss || 0}</td>
                    <td style={{ ...tdCenter, fontWeight: 'bold' }}>{point.points || 0}</td>
                    <td style={tdCenter}>{point.netRunRate?.toFixed(2) || '0.00'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {players.length > 0 && (
        <div className="detail-container">
          <h2 className="detail-title">Players</h2>
          <div className="players-grid">
            {players.map((player) => (
              <Link to={`/player/${player.playerId}`} key={player.playerId} className="player-card">
                <div className="player-row">
                  <span className={`player-role ${getPlayerRoleClass(player.roleOfPlayer)}`}>
                    {player.roleOfPlayer}
                  </span>
                  <span className="player-name">{player.playerName}</span>
                  <span className="player-nationality">{player.nationality}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {matches.length > 0 && (
        <div className="detail-container">
          <h2 className="detail-title">Matches Played</h2>
          <div className="matches-list">
            {sortedMatches.map((match) => (
              <Link to={`/match/${match.matchId}`} key={match.matchId} className="match-card">
                <div className="match-teams">
                  <strong>{getTeamName(match.team1?.teamId)}</strong> vs <strong>{getTeamName(match.team2?.teamId)}</strong>
                </div>
  
                <div>{formatDate(match.date)}</div>
                <div>{getMatchResult(match)}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const thStyle = {
  padding: '1rem',
  textAlign: 'center',
  borderBottom: '2px solid #dee2e6'
};

const tdStyle = {
  padding: '1rem',
  borderBottom: '1px solid #dee2e6'
};

const tdCenter = {
  ...tdStyle,
  textAlign: 'center'
};

export default TeamDetail;
