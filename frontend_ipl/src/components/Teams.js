import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await apiService.getAllTeams();
        setTeams(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch teams');
        console.error('Error fetching teams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div className="loading">Loading teams...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h1 className="page-title">IPL Teams</h1>
      
      <div className="card-grid">
        {teams.map((team) => (
          <div key={team.teamId} className="card team-card">
            <div className="team-logo">
              {team.teamName?.substring(0, 2).toUpperCase() || 'T'}
            </div>
            <div className="card-title">
              {team.teamName}
            </div>
            <div className="card-content">
              {/* <div className="detail-item">
                <span className="detail-label">City:</span>
                <span className="detail-value">{team.city || 'N/A'}</span>
              </div> */}
              
              <div className="detail-item">
                <span className="detail-label">Founded:</span>
                <span className="detail-value">{team.foundedYear || 'N/A'}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Owner:</span>
                <span className="detail-value">{team.owner_name || 'N/A'}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Coach:</span>
                <span className="detail-value">{team.coach || 'N/A'}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Captain:</span>
                <span className="detail-value">{team.captainId || 'N/A'}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Home Ground:</span>
                <span className="detail-value">{team.homeGround || 'N/A'}</span>
              </div>
              
              <Link 
                to={`/team/${team.teamId}`} 
                className="btn"
              >
                View Team Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {teams.length === 0 && (
        <div className="card">
          <div className="card-content">
            <p>No teams found. Please check if the backend is running and has data.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
