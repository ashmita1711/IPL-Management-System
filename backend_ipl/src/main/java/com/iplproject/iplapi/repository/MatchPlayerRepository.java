package com.iplproject.iplapi.repository;

import com.iplproject.iplapi.model.MatchPlayer;

import com.iplproject.iplapi.model.MatchPlayerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchPlayerRepository extends JpaRepository<MatchPlayer, MatchPlayerId> {
    List<MatchPlayer> findByIdPlayerId(Integer playerId);
    List<MatchPlayer> findByIdMatchId(Integer matchId);
    List<MatchPlayer> findByIdMatchIdAndTeamId(Integer matchId, Integer teamId);
	List<MatchPlayer> findByMatch_MatchId(Long matchId);
	@Query("SELECT mp.player FROM MatchPlayer mp WHERE mp.match.matchId = :matchId")
	List<MatchPlayer> findPlayersByMatchId(@Param("matchId") Integer matchId);
}
