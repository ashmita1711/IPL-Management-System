package com.iplproject.iplapi.repository;

import com.iplproject.iplapi.model.MatchDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MatchRepository extends JpaRepository<MatchDetail, Integer> {
    
    // Find matches by season year
    List<MatchDetail> findBySeason_SeasonYear(Integer seasonYear);
    
    // Find matches by venue
    List<MatchDetail> findByVenueId(Integer venueId);
    
    // Find matches won by a team
    List<MatchDetail> findByWinnerTeamId(Integer teamId);
    
    // Find matches where a player won 'Player of the Match'
    List<MatchDetail> findByPlayerOfMatchId(Integer playerId);
    
    // Find matches involving a specific team (either team1 or team2)
    List<MatchDetail> findByTeam1_TeamIdOrTeam2_TeamId(Integer teamId, Integer teamId2);
    
    // 🆕 ADDED: Find matches where a player participated
    @Query("SELECT DISTINCT m FROM MatchDetail m " +
           "JOIN m.matchPlayers mp " +
           "WHERE mp.player.playerId = :playerId")
    List<MatchDetail> findMatchesByPlayerId(@Param("playerId") Integer playerId);
    
    // Alternative query using team-based approach if MatchPlayer relationship doesn't exist
    @Query("SELECT m FROM MatchDetail m " +
           "WHERE m.team1.teamId IN (SELECT p.teamId FROM Player p WHERE p.playerId = :playerId) " +
           "OR m.team2.teamId IN (SELECT p.teamId FROM Player p WHERE p.playerId = :playerId)")
    List<MatchDetail> findMatchesByPlayerIdViaTeam(@Param("playerId") Integer playerId);
    
    // Custom query for team matches
    @Query("SELECT m FROM MatchDetail m WHERE m.team1.teamId = :teamId OR m.team2.teamId = :teamId")
    List<MatchDetail> findByTeamId(@Param("teamId") Integer teamId);
}