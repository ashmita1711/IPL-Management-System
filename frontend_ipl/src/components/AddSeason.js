import React, { useState } from 'react';
import { apiService } from '../api';
import { useNavigate } from 'react-router-dom';

const AddSeason = () => {
  const [season, setSeason] = useState({
    seasonYear: '',
    startDate: '',
    endDate: '',
    winnerTeamId: '',
    totalTeams: '',
    totalMatches: '',
    prizeMoney: '',
    runnerUpTeamId: '',
    status: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSeason({ ...season, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        seasonYear: parseInt(season.seasonYear),
        startDate: season.startDate,
        endDate: season.endDate,
        winnerTeam: { teamId: parseInt(season.winnerTeamId) },
        seasonId: parseInt(season.seasonYear), // Or use another value
        totalTeams: parseInt(season.totalTeams),
        totalMatches: parseInt(season.totalMatches),
        prizeMoney: parseFloat(season.prizeMoney),
        runnerUpTeam: { teamId: parseInt(season.runnerUpTeamId) }, // Fixed: was runnerUpTeam, now runnerUpTeamId
        status: season.status
      };

      // Enhanced validation
      if (
        isNaN(payload.seasonYear) ||
        isNaN(payload.winnerTeam.teamId) ||
        isNaN(payload.totalTeams) ||
        isNaN(payload.totalMatches) ||
        isNaN(payload.prizeMoney) ||
        (season.runnerUpTeamId && isNaN(payload.runnerUpTeam.teamId)) // Check runner-up only if provided
      ) {
        alert("Please enter valid numeric values for all number fields");
        return;
      }

      // Handle empty runner-up team (optional field)
      if (!season.runnerUpTeamId || season.runnerUpTeamId === '') {
        delete payload.runnerUpTeam; 
      }
      
      await apiService.addSeason(payload);
      alert('Season added successfully!');
      navigate('/seasons');
    } catch (error) {
      alert('Error adding season');
      console.error('Full error details:', error);
      console.error('Error response:', error.response?.data);
    }
  };

  return (
    <div style={{
      padding: '30px',
      maxWidth: '600px',
      margin: 'auto',
      backgroundColor: '#f5f7fa',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '20px' }}>Add New IPL Season</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input type="number" name="seasonYear" placeholder="Season Year" onChange={handleChange} required />
        <input type="date" name="startDate" placeholder="Start Date" onChange={handleChange} required />
        <input type="date" name="endDate" placeholder="End Date" onChange={handleChange} required />
        <input type="number" name="winnerTeamId" placeholder="Winner Team ID" onChange={handleChange} required />
        <input type="number" name="totalTeams" placeholder="Total Teams" onChange={handleChange} required />
        <input type="number" name="totalMatches" placeholder="Total Matches" onChange={handleChange} required />
        <input type="number" name="runnerUpTeamId" placeholder="Runner-up Team ID (Optional)" onChange={handleChange} />
        <input type="number" step="0.01" name="prizeMoney" placeholder="Prize Money" onChange={handleChange} required />
        <select name="status" onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#2575fc', color: 'white', border: 'none', borderRadius: '4px' }}>
          Add Season
        </button>
      </form>
    </div>
  );
};

export default AddSeason;