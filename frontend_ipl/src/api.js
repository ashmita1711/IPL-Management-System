import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/api';
// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Error handling interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not running on port 8080');
      return Promise.reject({ 
        message: 'Backend server is not running. Please start your server on port 8080.' 
      });
    }
    
    if (error.response) {
      // Server responded with error status
      console.error('Server Error:', error.response.status, error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
      return Promise.reject({ 
        message: 'No response from server. Check if backend is running and CORS is configured.' 
      });
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

// API service functions
export const apiService = {
  // Season endpoints
  getAllSeasons: () => api.get('/seasons'),
  getSeasonById: (year) => api.get(`/seasons/${year}`),
  addSeason: (season) => api.post('/seasons', season),
  
  // Match endpoints
  getAllMatches: () => api.get('/matches'),
  getMatchById: (matchId) => api.get(`/matches/${matchId}`),
  getMatchesBySeason: (seasonYear) => api.get(`/matches/season/${seasonYear}`),
  getMatchesByTeam: (teamId) => api.get(`/matches/team/${teamId}`),
  getMatchesByPlayer: (playerId) => api.get(`/matches/player/${playerId}`),
  addMatch: (match) => api.post('/matches', match),

  // Team endpoints
  getAllTeams: () => api.get('/teams'),
  getTeamById: (teamId) => api.get(`/teams/${teamId}`),
  addTeam: (team) => api.post('/teams', team),

  // Player endpoints
  getAllPlayers: () => api.get('/players'),
  getPlayerById: (playerId) => api.get(`/players/${playerId}`),
  getPlayersByTeam: (teamId) => api.get(`/players/team/${teamId}`),
  getPlayersByRole: (role) => api.get(`/players/role/${role}`),
  addPlayer: (player) => api.post('/players', player), 
  
  // Venue endpoints
  getAllVenues: () => api.get('/venues'),
  getVenueById: (venueId) => api.get(`/venues/${venueId}`),
  
  // Points endpoints
  getAllPoints: () => api.get('/points'),
  getPointsBySeason: (seasonYear) => api.get(`/points/season/${seasonYear}`),
  getPointsByTeam: (teamId) => api.get(`/points/team/${teamId}`),
  
  // Umpire endpoints
  getAllUmpires: () => api.get('/umpires'),
  getUmpireById: (umpireId) => api.get(`/umpires/${umpireId}`),
  
  // Match Player endpoints
  getAllMatchPlayers: () => api.get('/matchplayers'),
  getMatchPlayersByMatch: (matchId) => api.get(`/matchplayers/match/${matchId}`),
  getMatchPlayersByPlayer: (playerId) => api.get(`/matchplayers/byplayer/${playerId}`),
  
  // Player Performance endpoints
  getAllPlayerPerformances: () => api.get('/performances'),
  getPlayerPerformancesByMatch: (matchId) => api.get(`/performances/match/${matchId}`),
  getPlayerPerformancesByPlayer: (playerId) => api.get(`/performances/player/${playerId}`),
  
  // Injury endpoints
  getAllInjuries: () => api.get('/injuries'),
  getInjuriesByPlayer: (playerId) => api.get(`/injuries/player/${playerId}`),
  
  // Player Career Stats endpoints
  getAllPlayerCareerStats: () => api.get('/player-career-stats'),
  getPlayerCareerStatsById: (playerId) => api.get(`/player-career-stats/${playerId}`),
};

// Health check function
export const checkBackendHealth = async () => {
  try {
    const response = await api.get('/health');
    return { status: 'healthy', data: response.data };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
};

export default api;