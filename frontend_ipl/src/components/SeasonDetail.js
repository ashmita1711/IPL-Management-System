import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../api';

const SeasonDetail = () => {
  const { seasonYear } = useParams();
  const [season, setSeason] = useState(null);
  const [matches, setMatches] = useState([]);
  const [points, setPoints] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeasonData = async () => {
      try {
        setLoading(true);
        const [seasonRes, matchesRes, pointsRes, teamsRes] = await Promise.all([
          apiService.getSeasonById(seasonYear),
          apiService.getMatchesBySeason(seasonYear),
          apiService.getPointsBySeason(seasonYear),
          apiService.getAllTeams()
        ]);
        setSeason(seasonRes.data);
        setMatches(matchesRes.data);
        setPoints(pointsRes.data);
        setTeams(teamsRes.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch season data');
        console.error('Error fetching season data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonData();
  }, [seasonYear]);

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

  // Get winner name by comparing winnerTeamId with team1 and team2 IDs
  let winnerName = 'Unknown';

  if (match.team1?.teamId === match.winnerTeamId) {
    winnerName = match.team1?.teamName || 'Team 1';
  } else if (match.team2?.teamId === match.winnerTeamId) {
    winnerName = match.team2?.teamName || 'Team 2';
  }

  if (match.winByRuns > 0) {
    return `${winnerName} won by ${match.winByRuns} runs`;
  } else if (match.winByWickets > 0) {
    return `${winnerName} won by ${match.winByWickets} wickets`;
  } else {
    return `${winnerName} won`;
  }
};

  // Sort points table by points (descending) and then by net run rate
  const sortedPoints = points.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    }
    return (b.netRunRate || 0) - (a.netRunRate || 0);
  });

  if (loading) {
    return <div className="loading">Loading season details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!season) {
    return <div className="error">Season not found</div>;
  }

  return (
    <div>
      <div className="detail-container">
        <div className="detail-header">
          <h1 className="detail-title">IPL {season.seasonYear}</h1>
          <p className="detail-subtitle">
            {formatDate(season.startDate)} - {formatDate(season.endDate)}
          </p>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className="detail-value" style={{ textTransform: 'capitalize' }}>
              {season.status}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Total Teams:</span>
            <span className="detail-value">{season.totalTeams || 'N/A'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Total Matches:</span>
            <span className="detail-value">{season.totalMatches || 'N/A'}</span>
          </div>
          
          {season.winnerTeam && (
            <div className="detail-item">
              <span className="detail-label">Winner:</span>
              <span className="detail-value">
                <Link to={`/team/${season.winnerTeam.teamId}`} className="btn btn-secondary">
                  {getTeamName(season.winnerTeam.teamId)}
                </Link>
              </span>
            </div>
          )}
          
          {season.runnerUpTeam && (
            <div className="detail-item">
              <span className="detail-label">Runner-up:</span>
              <span className="detail-value">
                <Link to={`/team/${season.runnerUpTeam.teamId}`} className="btn btn-secondary">
                  {getTeamName(season.runnerUpTeam.teamId)}
                </Link>
              </span>
            </div>
          )}
          
          {season.prizeMoney && (
            <div className="detail-item">
              <span className="detail-label">Prize Money:</span>
              <span className="detail-value">₹{season.prizeMoney.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Points Table */}
      {sortedPoints.length > 0 && (
        <div className="detail-container">
          <h2 className="detail-title">Points Table</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Team</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Matches</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Won</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Lost</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Points</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>NRR</th>
                </tr>
              </thead>
              <tbody>
                {sortedPoints.map((point, index) => (
                  <tr key={point.team?.teamId}>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                      <Link to={`/team/${point.team?.teamId}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                        {point.team?.teamName || 'Unknown'}
                      </Link>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>
                      {point.matchesPlayed || 0}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>
                      {point.wins || 0}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>
                      {point.loss || 0}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>
                      {point.points || 0}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>
                      {point.netRunRate ? point.netRunRate.toFixed(3) : '0.000'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Matches */}
      <div className="detail-container">
        <h2 className="detail-title">Matches ({matches.length})</h2>
        
        {matches.length > 0 ? (
          <div className="match-list">
            {matches.map((match) => (
              <div key={match.matchId} className="match-item">
                <div className="match-teams">
                  <Link to={`/team/${match.team1?.teamId}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                    {getTeamName(match.team1?.teamName)  || 'Team 1'}
                  </Link>
                  {' vs '}
                  <Link to={`/team/${match.team2?.teamId}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                    {getTeamName(match.team2?.teamName)  || 'Team 2'}
                  </Link>
                </div>
                <div className="match-date">
                  {formatDate(match.date)}
                </div>
                <div className="match-result">
                  {getMatchResult(match)}
                </div>
                <Link to={`/match/${match.matchId}`} className="btn btn-secondary">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="card">
            <div className="card-content">
              <p>No matches found for this season.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonDetail;