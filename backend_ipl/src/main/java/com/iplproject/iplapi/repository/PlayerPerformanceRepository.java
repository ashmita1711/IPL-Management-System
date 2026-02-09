package com.iplproject.iplapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iplproject.iplapi.model.PlayerPerformance;
import com.iplproject.iplapi.model.PlayerPerformanceId;

@Repository
public interface PlayerPerformanceRepository extends JpaRepository<PlayerPerformance, PlayerPerformanceId> { 
	 List<PlayerPerformance> findByIdMatchId(Integer matchId);
	    List<PlayerPerformance> findByIdPlayerId(Integer playerId);
}
