import React, { useState } from 'react';
import { apiService } from '../api';
import { useNavigate } from 'react-router-dom';

const AddTeam = () => {
  const [team, setTeam] = useState({
    teamId: '', 
    teamName: '',
    coach: '',
    captainId: '',
    ownerName: '',
    logo: '',
    foundedYear: '',
    teamColor: '',
    totalChampionships: '',
    homeGround: '',
    socialMediaHandles: '' 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert numeric fields to proper types
      const payload = {
        teamId: parseInt(team.teamId),
        teamName: team.teamName,
        coach: team.coach,
        captainId: parseInt(team.captainId),
        owner_name: team.ownerName, //backend expects owner_name, not ownerName
        logo: team.logo,
        foundedYear: parseInt(team.foundedYear),
        teamColor: team.teamColor,
        totalChampionships: parseInt(team.totalChampionships),
        homeGround: team.homeGround, 
        socialMediaHandles: team.socialMediaHandles 
      };

      // Validation for numeric fields
      if (
        isNaN(payload.teamId) ||
        isNaN(payload.captainId) ||
        isNaN(payload.foundedYear) ||
        isNaN(payload.totalChampionships)
      ) {
        alert("Please enter valid numeric values for Team ID, Captain ID, Founded Year, and Total Championships");
        return;
      }

      console.log('Payload being sent:', payload); // Debug log

      await apiService.addTeam(payload);
      alert('Team added successfully!');
      navigate('/teams');
    } catch (error) {
      alert('Error adding team');
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
      <h2 style={{ marginBottom: '20px' }}>Add New Team</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input 
          type="number" 
          name="teamId" 
          placeholder="Team ID (must be unique)" 
          onChange={handleChange} 
          required 
        />
        <input name="teamName" placeholder="Team Name" onChange={handleChange} required />
        <input name="coach" placeholder="Coach" onChange={handleChange} required />
        <input 
          type="number" 
          name="captainId" 
          placeholder="Captain ID" 
          onChange={handleChange} 
          required 
        />
        <input name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
        <input name="logo" placeholder="Logo URL or Filename" onChange={handleChange} required />
        <input 
          type="number" 
          name="foundedYear" 
          placeholder="Founded Year" 
          onChange={handleChange} 
          required 
        />
        <input name="teamColor" placeholder="Team Color" onChange={handleChange} required />
        <input 
          type="number" 
          name="totalChampionships" 
          placeholder="Total Championships" 
          onChange={handleChange} 
          required 
        />
        <input 
          name="homeGround" 
          placeholder="Home Ground" 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="socialMediaHandles" 
          placeholder='Social Media Handles (JSON format, e.g., {"twitter": "@teamname", "instagram": "@teamname"})' 
          onChange={handleChange}
          rows="3"
          style={{ resize: 'vertical', fontFamily: 'inherit' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          Add Team
        </button>
      </form>
    </div>
  );
};

export default AddTeam;