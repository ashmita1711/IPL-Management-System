import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../api';

const Seasons = () => {
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        setLoading(true);
        const response = await apiService.getAllSeasons();
        setSeasons(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch seasons');
        console.error('Error fetching seasons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#28a745';
      case 'ongoing':
        return '#007bff';
      case 'upcoming':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading seasons...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h1 className="page-title">IPL Seasons</h1>
      
      <div className="card-grid">
        {seasons.map((season) => (
          <div key={season.seasonYear} className="card">
            <div className="card-title">
              IPL {season.seasonYear}
            </div>
            <div className="card-content">
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span 
                  className="detail-value"
                  style={{ 
                    color: getStatusColor(season.status),
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}
                >
                  {season.status}
                </span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">
                  {formatDate(season.startDate)} - {formatDate(season.endDate)}
                </span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Teams:</span>
                <span className="detail-value">{season.totalTeams || 'N/A'}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Matches:</span>
                <span className="detail-value">{season.totalMatches || 'N/A'}</span>
              </div>
              
              {season.prizeMoney && (
                <div className="detail-item">
                  <span className="detail-label">Prize Money:</span>
                  <span className="detail-value">₹{season.prizeMoney.toLocaleString()}</span>
                </div>
              )}
              
              <Link 
                to={`/season/${season.seasonYear}`} 
                className="btn"
              >
                View Season Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {seasons.length === 0 && (
        <div className="card">
          <div className="card-content">
            <p>No seasons found. Please check if the backend is running and has data.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seasons;