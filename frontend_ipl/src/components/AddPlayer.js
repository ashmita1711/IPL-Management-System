import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPlayer = () => {
  const [player, setPlayer] = useState({
    playerName: '',
    teamId: '',
    roleOfPlayer: '',
    nationality: '',
    dob: '',
    battingStyle: '',
    ballingStyle: '',
    photoOfPlayer: '',
    jerseyNumber: '',
    heightCm: '',
    weightKg: '',
    priceBought: '',
    playersAge: '',
    currentFormRating: '',
    isOverseas: false
  });

  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/teams')
      .then(res => {
        console.log("Fetched teams:", res.data);
        setTeams(res.data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setPlayer(prevState => ({ ...prevState, [name]: checked }));
    } else {
      setPlayer(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Transform the data to match backend expectations
    const playerData = {
      playerName: player.playerName,
      teamId: parseInt(player.teamId),
      roleOfPlayer: player.roleOfPlayer,
      nationality: player.nationality,
      dob: player.dob,
      battingStyle: player.battingStyle,
      ballingStyle: player.ballingStyle,
      photoOfPlayer: player.photoOfPlayer || null,
      jerseyNumber: player.jerseyNumber ? parseInt(player.jerseyNumber) : null,
      heightCm: player.heightCm ? parseInt(player.heightCm) : null,
      weightKg: player.weightKg ? parseInt(player.weightKg) : null,
      // FIX: Send 0 if priceBought is empty, otherwise send the parsed value
      priceBought: player.priceBought && player.priceBought.trim() !== '' 
        ? parseFloat(player.priceBought) 
        : 0,
      // Add the missing fields
      playersAge: player.playersAge ? parseInt(player.playersAge) : null,
      currentFormRating: player.currentFormRating ? parseInt(player.currentFormRating) : null,
      isOverseas: player.isOverseas
    };

    console.log('Sending player data:', playerData);

    axios.post('http://localhost:8080/api/players', playerData)
      .then((response) => {
        console.log('Player added successfully:', response.data);
        alert('Player added successfully!');
        navigate('/players');
      })
      .catch(err => {
        console.error('Error adding player:', err);
        console.error('Error response:', err.response?.data);
        alert(`Failed to add player: ${err.response?.data?.message || err.message}`);
      });
  };

  return (
    <div style={{
      padding: '30px',
      maxWidth: '700px',
      margin: 'auto',
      backgroundColor: '#f5f7fa',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '20px' }}>Add New Player</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <input 
          name="playerName" 
          placeholder="Player Name" 
          value={player.playerName} 
          onChange={handleChange} 
          required 
        />
        
        <select 
          name="teamId" 
          value={player.teamId} 
          onChange={handleChange} 
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Select Team</option>
          {teams.map(team => (
            <option key={team.teamId} value={team.teamId}>{team.teamName}</option>
          ))}
        </select>
        
        <select 
          name="roleOfPlayer" 
          value={player.roleOfPlayer} 
          onChange={handleChange} 
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Select Role</option>
          <option value="bat">Batsman</option>
          <option value="bowl">Bowler</option>
          <option value="allrounder">All-rounder</option>
        </select>
        
        <input 
          name="nationality" 
          placeholder="Nationality" 
          value={player.nationality} 
          onChange={handleChange} 
          required 
        />
        
        <input 
          name="dob" 
          type="date" 
          placeholder="Date of Birth" 
          value={player.dob} 
          onChange={handleChange} 
          required 
        />
        
        <select 
          name="battingStyle" 
          value={player.battingStyle} 
          onChange={handleChange} 
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Select Batting Style</option>
          <option value="Right-handed">Right-handed</option>
          <option value="Left-handed">Left-handed</option>
        </select>
        
        <select 
          name="ballingStyle" 
          value={player.ballingStyle} 
          onChange={handleChange}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Select Bowling Style (Optional)</option>
          <option value="Right-arm fast">Right-arm fast</option>
          <option value="Right-arm medium">Right-arm medium</option>
          <option value="Left-arm fast">Left-arm fast</option>
          <option value="Left-arm medium">Left-arm medium</option>
          <option value="Right-arm off-spin">Right-arm off-spin</option>
          <option value="Right-arm leg-spin">Right-arm leg-spin</option>
          <option value="Left-arm orthodox">Left-arm orthodox</option>
          <option value="Left-arm chinaman">Left-arm chinaman</option>
        </select>
        
        <input 
          name="photoOfPlayer" 
          placeholder="Photo Filename (Optional)" 
          value={player.photoOfPlayer} 
          onChange={handleChange} 
        />
        
        <input 
          name="jerseyNumber" 
          type="number" 
          placeholder="Jersey Number (Optional)" 
          value={player.jerseyNumber} 
          onChange={handleChange}
          min="1"
          max="99"
        />
        
        <input 
          name="heightCm" 
          type="number" 
          placeholder="Height in cm (Optional)" 
          value={player.heightCm} 
          onChange={handleChange}
          min="150"
          max="220"
        />
        
        <input 
          name="weightKg" 
          type="number" 
          placeholder="Weight in kg (Optional)" 
          value={player.weightKg} 
          onChange={handleChange}
          min="50"
          max="120"
        />
        
        <input 
          name="priceBought" 
          type="number" 
          step="0.01"
          placeholder="Price Bought in ₹ (Optional)" 
          value={player.priceBought} 
          onChange={handleChange}
          min="0"
          max="999999999.99"
        />

        <input 
          name="playersAge" 
          type="number" 
          placeholder="Age (Optional)" 
          value={player.playersAge} 
          onChange={handleChange}
          min="16"
          max="50"
        />

        <input 
          name="currentFormRating" 
          type="number" 
          placeholder="Current Form Rating 1-10 (Optional)" 
          value={player.currentFormRating} 
          onChange={handleChange}
          min="1"
          max="10"
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            name="isOverseas" 
            type="checkbox" 
            checked={player.isOverseas} 
            onChange={handleChange}
            id="isOverseas"
          />
          <label htmlFor="isOverseas" style={{ fontSize: '14px' }}>
            Is Overseas Player?
          </label>
        </div>

        <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
          <button type="submit" style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Add Player
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlayer;