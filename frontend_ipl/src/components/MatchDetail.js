import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../api';

const MatchDetail = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState([]);
  const [venues, setVenues] = useState([]);
  const [umpires, setUmpires] = useState([]);
  const [matchPlayers, setMatchPlayers] = useState([]);
  const [playerPerformances, setPlayerPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        setLoading(true);
        
        const [matchRes, teamsRes, venuesRes, umpiresRes, matchPlayersRes, performancesRes] = await Promise.all([
          apiService.getMatchById(matchId),
          apiService.getAllTeams(),
          apiService.getAllVenues(),
          apiService.getAllUmpires(),
          apiService.getMatchPlayersByMatch(matchId),
          apiService.getPlayerPerformancesByMatch(matchId)
        ]);

        setMatch(matchRes.data);
        setTeams(teamsRes.data);
        setVenues(venuesRes.data);
        setUmpires(umpiresRes.data);
        setMatchPlayers(matchPlayersRes.data);
        setPlayerPerformances(performancesRes.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch match data');
        console.error('Error fetching match data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [matchId]);

  const getTeamName = (teamId) => {
    const team = teams.find(t => t.teamId === teamId);
    return team ? team.teamName : `Team ${teamId}`;
  };

  const getVenueName = (venueId) => {
    const venue = venues.find(v => v.venueId === venueId);
    return venue ? `${venue.name}, ${venue.city}` : `Venue ${venueId}`;
  };

  const getUmpireName = (umpireId) => {
    const umpire = umpires.find(u => u.umpireId === umpireId);
    return umpire ? umpire.umpireName : `Umpire ${umpireId}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMatchResult = () => {
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

  const getPlayersForTeam = (teamId) => {
    return matchPlayers.filter(mp => mp.teamId === teamId);
  };

  const getPerformanceForPlayer = (playerId) => {
    return playerPerformances.find(p => p.playerId === playerId);
  };

  if (loading) {
    return <div className="loading">Loading match details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!match) {
    return <div className="error">Match not found</div>;
  }

  return (
    <div>
      <div className="detail-container">
        <div className="detail-header">
          <h1 className="detail-title">
            <Link to={`/team/${match.team1?.teamId}`} style={{ textDecoration: 'none', color: '#007bff' }}>
              {getTeamName(match.team1?.teamId)}
            </Link>
            {' vs '}
            <Link to={`/team/${match.team2?.teamId}`} style={{ textDecoration: 'none', color: '#007bff' }}>
              {getTeamName(match.team2?.teamId)}
            </Link>
          </h1>
          <p className="detail-subtitle">
            {formatDate(match.date)}
          </p>
        </div>

        <div className="detail-grid">
          {/* <div className="detail-item">
            <span className="detail-label">Match Type:</span>
            <span className="detail-value">{match.matchType || 'N/A'}</span>
          </div> */}
          
          <div className="detail-item">
            <span className="detail-label">Venue:</span>
            <span className="detail-value">{getVenueName(match.venueId)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Season:</span>
            <span className="detail-value">
              {match.season?.seasonYear ? (
                <Link to={`/season/${match.season.seasonYear}`} className="btn btn-secondary">
                  IPL {match.season.seasonYear}
                </Link>
              ) : 'N/A'}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Toss Winner:</span>
            <span className="detail-value">
              {match.tossWinnerId ? (
                <Link to={`/team/${match.tossWinnerId}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                  {getTeamName(match.tossWinnerId)}
                </Link>
              ) : 'N/A'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Toss Decision:</span>
            <span className="detail-value" style={{ textTransform: 'capitalize' }}>
              {match.tossDecision || 'N/A'}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Match Result:</span>
            <span className="detail-value" style={{ fontWeight: 'bold', color: '#28a745' }}>
              {getMatchResult()}
            </span>
          </div>
          
          {match.umpire1 && (
            <div className="detail-item">
              <span className="detail-label">Umpire 1:</span>
              <span className="detail-value">{getUmpireName(match.umpire1)}</span>
            </div>
          )}
          
          {match.umpire2 && (
            <div className="detail-item">
              <span className="detail-label">Umpire 2:</span>
              <span className="detail-value">{getUmpireName(match.umpire2)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Team Squads */}
      <div className="detail-container">
        <h2 className="detail-title">Team Squads</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Team 1 Squad */}
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#007bff' }}>
              <Link to={`/team/${match.team1?.teamId}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                {getTeamName(match.team1?.teamId)}
              </Link>
            </h3>
            <div className="card-grid">
              {getPlayersForTeam(match.team1).map((matchPlayer) => {
                const performance = getPerformanceForPlayer(matchPlayer.playerId);
                return (
                  <div key={matchPlayer.playerId} className="card player-card">
                    <div className="player-photo">
                      {matchPlayer.playerId}
                    </div>
                    <div className="card-title">
                      <Link to={`/player/${matchPlayer.playerId}`} style={{ textDecoration: 'none', color: '#333' }}>
                        Player {matchPlayer.playerId}
                      </Link>
                    </div>
                    <div className="card-content">
                      <div className="detail-item">
                        <span className="detail-label">Role:</span>
                        <span className="detail-value">{matchPlayer.role || 'N/A'}</span>
                      </div>
                      {performance && (
                        <>
                          <div className="detail-item">
                            <span className="detail-label">Runs:</span>
                            <span className="detail-value">{performance.runs || 0}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Wickets:</span>
                            <span className="detail-value">{performance.wickets || 0}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team 2 Squad */}
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#007bff' }}>
              <Link to={`/team/${match.team2?.teamId}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                {getTeamName(match.team2?.teamId)}
              </Link>
            </h3>
            <div className="card-grid">
              {getPlayersForTeam(match.team2).map((matchPlayer) => {
                const performance = getPerformanceForPlayer(matchPlayer.playerId);
                return (
                  <div key={matchPlayer.playerId} className="card player-card">
                    <div className="player-photo">
                      {matchPlayer.playerId}
                    </div>
                    <div className="card-title">
                      <Link to={`/player/${matchPlayer.playerId}`} style={{ textDecoration: 'none', color: '#333' }}>
                        Player {matchPlayer.playerId}
                      </Link>
                    </div>
                    <div className="card-content">
                      <div className="detail-item">
                        <span className="detail-label">Role:</span>
                        <span className="detail-value">{matchPlayer.role || 'N/A'}</span>
                      </div>
                      {performance && (
                        <>
                          <div className="detail-item">
                            <span className="detail-label">Runs:</span>
                            <span className="detail-value">{performance.runs || 0}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Wickets:</span>
                            <span className="detail-value">{performance.wickets || 0}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;