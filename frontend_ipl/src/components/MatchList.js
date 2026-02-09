import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function MatchList() {
  const { year } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/matches/season/${year}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch matches');
        }
        return res.json();
      })
      .then(data => {
        console.log("Match API response for season", year, ":", data);
        setMatches(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching matches:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [year]);

  if (loading) return <p>Loading matches...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Matches in Season {year}</h2>
      <ul>
        {matches.map(match => (
          <li key={match.matchId}>
            <Link to={`/seasons/${year}/match/${match.matchId}`}>
              Match {match.matchId}: {match.team1?.team_name || match.team1?.teamName || 'Team 1'} vs {match.team2?.team_name || match.team2?.teamName || 'Team 2'}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/">← Back to Seasons</Link>
    </div>
  );
}

export default MatchList;
