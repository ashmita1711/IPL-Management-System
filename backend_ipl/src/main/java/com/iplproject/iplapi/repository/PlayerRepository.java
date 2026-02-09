package com.iplproject.iplapi.repository;

import com.iplproject.iplapi.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    
    // Find players by name (case-insensitive)
    List<Player> findByPlayerNameContainingIgnoreCase(String playerName);
    
    // Find players by team ID
    List<Player> findByTeamId(Integer teamId);
    
    // FIXED: Method name matches the actual field name in Player entity
    List<Player> findByRoleOfPlayer(String roleOfPlayer);
    
    // Alternative: Using @Query annotation for more control
    @Query("SELECT p FROM Player p WHERE p.roleOfPlayer = :role")
    List<Player> findByRole(@Param("role") String role);
}