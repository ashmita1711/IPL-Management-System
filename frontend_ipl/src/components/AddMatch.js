import React, { useState } from 'react';
import { apiService } from '../api';
import { useNavigate } from 'react-router-dom';

const AddMatch = () => {
  const [match, setMatch] = useState({
    matchId: '',
    seasonYear: '', // This should map to season.seasonYear in backend
    date: '', // Changed from matchDate to date to match entity field name
    matchNumber: '',
    team1Id: '', // These will need to be handled properly in backend
    team2Id: '',
    venueId: '',
    tossWinnerId: '',
    tossDecision: '',
    winnerTeamId: '',
    resultType: '',
    umpire1: '',
    umpire2: '',
    playerOfMatchId: '',
    winByRuns: '',
    winByWickets: '',
    team1Wickets: '',
    team2Wickets: '',
    isPlayoff: false, // Added missing field
    weather: '',
    attendance: '',
    team1Score: '',
    team2Score: '',
    matchDuration: '' // Added missing field (format: HH:MM:SS)
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMatch({ 
      ...match, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Transform the data to match backend expectations
      const matchData = {
        matchId: parseInt(match.matchId),
        date: match.date, // Keep as string, backend will parse
        matchNumber: parseInt(match.matchNumber),
        // Send team objects instead of just IDs
        team1: {
          teamId: parseInt(match.team1Id)
        },
        team2: {
          teamId: parseInt(match.team2Id)
        },
        venueId: parseInt(match.venueId),
        tossWinnerId: parseInt(match.tossWinnerId),
        tossDecision: match.tossDecision,
        winnerTeamId: parseInt(match.winnerTeamId),
        resultType: match.resultType,
        umpire1: parseInt(match.umpire1),
        umpire2: parseInt(match.umpire2),
        playerOfMatchId: parseInt(match.playerOfMatchId),
        winByRuns: match.winByRuns ? parseInt(match.winByRuns) : null,
        winByWickets: match.winByWickets ? parseInt(match.winByWickets) : null,
        team1Wickets: match.team1Wickets ? parseInt(match.team1Wickets) : null,
        team2Wickets: match.team2Wickets ? parseInt(match.team2Wickets) : null,
        isPlayoff: match.isPlayoff,
        weather: match.weather || null,
        attendance: match.attendance ? parseInt(match.attendance) : null,
        team1Score: match.team1Score || null,
        team2Score: match.team2Score || null,
        matchDuration: match.matchDuration || null,
        // Season should be handled as an object in backend
        season: {
          seasonYear: parseInt(match.seasonYear)
        }
      };

      console.log('Sending match data:', matchData); // Debug log
      await apiService.addMatch(matchData);
      alert('Match added successfully!');
      navigate('/matches');
    } catch (error) {
      alert('Error adding match: ' + (error.response?.data?.message || error.message));
      console.error('Full error:', error);
      console.error('Error response:', error.response?.data); // More detailed error logging
    }
  };

  return (
    <div style={{
      padding: '30px',
      maxWidth: '800px',
      margin: 'auto',
      backgroundColor: '#f5f7fa',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '20px' }}>Add New IPL Match</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input 
          name="matchId" 
          placeholder="Match ID" 
          type="number"
          value={match.matchId}
          onChange={handleChange} 
          required 
        />
        <input 
          name="seasonYear" 
          placeholder="Season Year (e.g., 2024)" 
          type="number"
          value={match.seasonYear}
          onChange={handleChange} 
          required 
        />
        <input 
          name="date" 
          type="date" 
          placeholder="Match Date" 
          value={match.date}
          onChange={handleChange} 
          required 
        />
        <input 
          name="matchNumber" 
          placeholder="Match Number" 
          type="number"
          value={match.matchNumber}
          onChange={handleChange} 
          required 
        />
        <input 
          name="team1Id" 
          placeholder="Team 1 ID" 
          type="number"
          value={match.team1Id}
          onChange={handleChange} 
          required 
        />
        <input 
          name="team2Id" 
          placeholder="Team 2 ID" 
          type="number"
          value={match.team2Id}
          onChange={handleChange} 
          required 
        />
        <input 
          name="venueId" 
          placeholder="Venue ID" 
          type="number"
          value={match.venueId}
          onChange={handleChange} 
          required 
        />
        <input 
          name="tossWinnerId" 
          placeholder="Toss Winner ID" 
          type="number"
          value={match.tossWinnerId}
          onChange={handleChange} 
          required 
        />
        <select 
          name="tossDecision" 
          value={match.tossDecision}
          onChange={handleChange} 
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Select Toss Decision</option>
          <option value="bat">Bat</option>
          <option value="bowl">Bowl</option>
        </select>
        <input 
          name="winnerTeamId" 
          placeholder="Winner Team ID" 
          type="number"
          value={match.winnerTeamId}
          onChange={handleChange} 
          required 
        />
        <select 
          name="resultType" 
          value={match.resultType}
          onChange={handleChange} 
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Select Result Type</option>
          <option value="normal">Normal</option>
          <option value="tie">Tie</option>
          <option value="super_over">Super Over</option>
          <option value="no_result">No Result</option>
        </select>
        <input 
          name="umpire1" 
          placeholder="Umpire 1 ID" 
          type="number"
          value={match.umpire1}
          onChange={handleChange} 
          required 
        />
        <input 
          name="umpire2" 
          placeholder="Umpire 2 ID" 
          type="number"
          value={match.umpire2}
          onChange={handleChange} 
          required 
        />
        <input 
          name="playerOfMatchId" 
          placeholder="Player of the Match ID" 
          type="number"
          value={match.playerOfMatchId}
          onChange={handleChange} 
          required 
        />
        <input 
          name="winByRuns" 
          placeholder="Win By Runs (leave empty if not applicable)" 
          type="number"
          value={match.winByRuns}
          onChange={handleChange} 
        />
        <input 
          name="winByWickets" 
          placeholder="Win By Wickets (leave empty if not applicable)" 
          type="number"
          value={match.winByWickets}
          onChange={handleChange} 
        />
        <input 
          name="team1Wickets" 
          placeholder="Team 1 Wickets" 
          type="number"
          value={match.team1Wickets}
          onChange={handleChange} 
        />
        <input 
          name="team2Wickets" 
          placeholder="Team 2 Wickets" 
          type="number"
          value={match.team2Wickets}
          onChange={handleChange} 
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            name="isPlayoff" 
            type="checkbox"
            checked={match.isPlayoff}
            onChange={handleChange} 
          />
          <label>Is Playoff Match?</label>
        </div>
        <input 
          name="weather" 
          placeholder="Weather" 
          value={match.weather}
          onChange={handleChange} 
        />
        <input 
          name="attendance" 
          placeholder="Attendance" 
          type="number"
          value={match.attendance}
          onChange={handleChange} 
        />
        <input 
          name="team1Score" 
          placeholder="Team 1 Score (e.g. 150/5)" 
          value={match.team1Score}
          onChange={handleChange} 
        />
        <input 
          name="team2Score" 
          placeholder="Team 2 Score (e.g. 140/10)" 
          value={match.team2Score}
          onChange={handleChange} 
        />
        <input 
          name="matchDuration" 
          placeholder="Match Duration (HH:MM:SS, e.g. 03:30:00)" 
          pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
          value={match.matchDuration}
          onChange={handleChange} 
        />
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#2575fc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Add Match
        </button>
      </form>
    </div>
  );
};

export default AddMatch;