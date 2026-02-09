import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../api';

const PlayerDetail = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [teams, setTeams] = useState([]);
  const [playerPerformances, setPlayerPerformances] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        
        const [playerRes, teamsRes, performancesRes, matchesRes] = await Promise.all([
          apiService.getPlayerById(playerId),
          apiService.getAllTeams(),
          apiService.getPlayerPerformancesByPlayer(playerId),
          apiService.getMatchesByPlayer(playerId)
        ]);

        console.log('Player data:', playerRes.data); // Debug log
        setPlayer(playerRes.data);
        setTeams(teamsRes.data);
        setPlayerPerformances(performancesRes.data);
        setMatches(matchesRes.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch player data');
        console.error('Error fetching player data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  const getTeamName = (teamId) => {
    const team = teams.find(t => t.teamId === teamId);
    return team ? team.name : `Team ${teamId}`;
  };

  const getMatchInfo = (matchId) => {
  const match = matches.find(m => m.matchId === matchId);
  if (match) {
    return {
      opponent: `${match.team1?.teamName || 'Team1'} vs ${match.team2?.teamName || 'Team2'}`,
      date: formatDate(match.date),
      venue: match.venue || 'N/A'
    };
  }
  return { opponent: 'N/A', date: 'N/A', venue: 'N/A' };
};
  const getPlayerRoleClass = (role) => {
    switch (role?.toLowerCase()) {
      case 'batsman': return 'player-role bat';
      case 'bowler': return 'player-role bowl';
      case 'all-rounder': return 'player-role all-rounder';
      case 'wicket-keeper': return 'player-role wicket-keeper';
      default: return 'player-role';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateStats = () => {
    if (playerPerformances.length === 0) return null;
    
    const totalRuns = playerPerformances.reduce((sum, perf) => sum + (perf.runs || 0), 0);
    const totalWickets = playerPerformances.reduce((sum, perf) => sum + (perf.wickets || 0), 0);
    const matchesPlayed = playerPerformances.length;
    const avgRuns = matchesPlayed > 0 ? (totalRuns / matchesPlayed).toFixed(2) : 0;
    const bestScore = Math.max(...playerPerformances.map(p => p.runs || 0));
    const bestBowling = Math.max(...playerPerformances.map(p => p.wickets || 0));
    const totalBalls = playerPerformances.reduce((sum, perf) => sum + (perf.ballsFaced || 0), 0);
    const totalFours = playerPerformances.reduce((sum, perf) => sum + (perf.fours || 0), 0);
    const totalSixes = playerPerformances.reduce((sum, perf) => sum + (perf.sixes || 0), 0);
    const strikeRate = totalBalls > 0 ? ((totalRuns / totalBalls) * 100).toFixed(2) : 0;
    
    return {
      totalRuns,
      totalWickets,
      matchesPlayed,
      avgRuns,
      bestScore,
      bestBowling,
      totalFours,
      totalSixes,
      strikeRate
    };
  };

  const stats = calculateStats();

  if (loading) {
    return <div className="loading">Loading player details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!player) {
    return <div className="error">Player not found</div>;
  }

  return (
    <div>
      <div className="detail-container">
        <div className="detail-header">
          <div className="player-photo-large">
            {player.playerName?.substring(0, 2).toUpperCase() || 'P'}
          </div>
          <h1 className="detail-title">{player.playerName || 'Unknown Player'}</h1>
          <div className={getPlayerRoleClass(player.roleOfPlayer)}>
            {player.roleOfPlayer || 'N/A'}
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Nationality:</span>
            <span className="detail-value">{player.nationality || 'N/A'}</span>
          </div>
          
          {player.teamId && (
            <div className="detail-item">
              <span className="detail-label">Current Team:</span>
              <span className="detail-value">
                <Link to={`/team/${player.teamId}`} className="btn btn-secondary">
                  {getTeamName(player.teamId)}
                </Link>
              </span>
            </div>
          )}
          
          <div className="detail-item">
            <span className="detail-label">Batting Style:</span>
            <span className="detail-value">{player.battingStyle || 'N/A'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Bowling Style:</span>
            <span className="detail-value">{player.ballingStyle || 'N/A'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Date of Birth:</span>
            <span className="detail-value">{formatDate(player.dob)}</span>
          </div>

          <div className="detail-item">
  <span className="detail-label">Jersey Number:</span>
  <span className="detail-value">{player.jerseyNumber || 'N/A'}</span>
</div>

<div className="detail-item">
  <span className="detail-label">Height:</span>
  <span className="detail-value">{player.heightCm ? `${player.heightCm} cm` : 'N/A'}</span>
</div>

<div className="detail-item">
  <span className="detail-label">Weight:</span>
  <span className="detail-value">{player.weightKg ? `${player.weightKg} kg` : 'N/A'}</span>
</div>

<div className="detail-item">
  <span className="detail-label">Overseas Player:</span>
  <span className="detail-value">{player.isOverseas ? 'Yes' : 'No'}</span>
</div>
        </div>
      </div>

      {/* Career Statistics */}
      {stats && (
        <div className="detail-container">
          <h2 className="detail-title">Career Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{stats.matchesPlayed}</div>
              <div className="stat-label">Matches Played</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.totalRuns}</div>
              <div className="stat-label">Total Runs</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.avgRuns}</div>
              <div className="stat-label">Average Runs</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.bestScore}</div>
              <div className="stat-label">Best Score</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.totalWickets}</div>
              <div className="stat-label">Total Wickets</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.bestBowling}</div>
              <div className="stat-label">Best Bowling</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.totalFours}</div>
              <div className="stat-label">Total 4s</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.totalSixes}</div>
              <div className="stat-label">Total 6s</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.strikeRate}</div>
              <div className="stat-label">Strike Rate</div>
            </div>
          </div>
        </div>
      )}

      {/* Performance History */}
      {playerPerformances.length > 0 && (
        <div className="detail-container">
          <h2 className="detail-title">Performance History</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Match</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Runs</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Balls</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>4s</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>6s</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>SR</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Wickets</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Runs Given</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Overs</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Economy</th>
                </tr>
              </thead>
              <tbody>
                {playerPerformances.map((performance, index) => {
                  const matchInfo = getMatchInfo(performance.id.matchId);

                  // error nhi ja rha 
                  const strikeRate = performance.balls_faced > 0 ? 
                    ((performance.runs_scored / performance.balls_faced) * 100).toFixed(2) : 'N/A';
                  const economy = performance.overs_bowled > 0 ? 
                    (performance.run_conceded / performance.overs_bowled).toFixed(2) : 'N/A';
                  
                  
                  return (
                    <tr key={index} style={{ 
                      borderBottom: '1px solid #dee2e6',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa'
                    }}>
                      <td style={{ padding: '0.8rem' }}>
                        <div>
                          <div style={{ fontWeight: 'bold' }}> {matchInfo.opponent}</div>
                          <div style={{ fontSize: '0.8rem', color: '#666' }}>
                            {matchInfo.date} 
                            {/* • {matchInfo.venue_Name  } */}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 'bold' }}>
                        {performance.runs_scored || 0}
                      </td>
                      <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                        {performance.balls_faced || 0}
                      </td>
                      <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                        {performance.fours || 0}
                      </td>
                      <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                        {performance.sixes || 0}
                      </td>
                      <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                        {strikeRate}
                      </td>
                      <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 'bold' }}>
                        {performance.wickets || 0}
                      </td>
                      <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                        {performance.run_conceded || 0}
                      </td>
                      <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                        {performance.overs_bowled || 0}
                      </td>
                      <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                        {economy}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Matches */}
      {matches.length > 0 && (
        <div className="detail-container">
          <h2 className="detail-title">Recent Matches</h2>
          <div className="matches-grid">
            {matches.slice(0, 5).map((match, index) => (
              <div key={index} className="match-card">
                <div className="match-teams">
                  <span className="team-name">{match.team1?.teamName || 'Team TBD'}</span>
<span className="vs"> vs </span>
<span className="team-name">{match.team2?.teamName || 'Team TBD'}</span>

                </div>
                <div className="match-details">
                  <div className="match-date">{formatDate(match.date)}</div>
                  {/* <div className="match-venue">{match.venue_name || 'Venue TBD'}</div> */}
                  <div className="match-status">{match.status || 'Scheduled'}</div>
                </div>
                <Link to={`/match/${match.matchId}`} className="btn btn-primary btn-sm">
                  View Match
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="detail-container">
        <div className="detail-actions">
          <Link to="/players" className="btn btn-secondary">
            ← Back to Players
          </Link>
          {player.teamId && (
            <Link to={`/team/${player.teamId}`} className="btn btn-primary">
              View Team
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;