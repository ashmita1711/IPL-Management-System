package com.iplproject.iplapi.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.iplproject.iplapi.model.PlayerCareerStats;
import com.iplproject.iplapi.repository.PlayerCareerStatsRepository;

import java.util.List;

@RestController
@RequestMapping("/api/player-career-stats")
@CrossOrigin(origins = "http://localhost:3000")
public class PlayerCareerStatsController {
    
    @Autowired
    private PlayerCareerStatsRepository playerCareerStatsRepository;
    
    @GetMapping
    public List<PlayerCareerStats> getAllPlayerCareerStats() {
        return playerCareerStatsRepository.findAll();
    }
    
    @GetMapping("/{playerId}")
    public PlayerCareerStats getPlayerCareerStatsById(@PathVariable Integer playerId) {
        return playerCareerStatsRepository.findById(playerId).orElse(null);
    }
    
    @PostMapping
    public PlayerCareerStats createPlayerCareerStats(@RequestBody PlayerCareerStats playerCareerStats) {
        return playerCareerStatsRepository.save(playerCareerStats);
    }
    
    @PutMapping("/{playerId}")
    public PlayerCareerStats updatePlayerCareerStats(@PathVariable Integer playerId, 
                                                    @RequestBody PlayerCareerStats playerCareerStats) {
        playerCareerStats.setPlayerId(playerId);
        return playerCareerStatsRepository.save(playerCareerStats);
    }
    
    @DeleteMapping("/{playerId}")
    public void deletePlayerCareerStats(@PathVariable Integer playerId) {
        playerCareerStatsRepository.deleteById(playerId);
    }
}
