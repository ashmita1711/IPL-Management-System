package com.iplproject.iplapi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iplproject.iplapi.model.PlayerPerformance;
import com.iplproject.iplapi.model.PlayerPerformanceId;
import com.iplproject.iplapi.repository.PlayerPerformanceRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/performances")
public class PlayerPerformanceController {
    private final PlayerPerformanceRepository repo;
    public PlayerPerformanceController(PlayerPerformanceRepository repo) { this.repo = repo; }

    @GetMapping
    public List<PlayerPerformance> getAll() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<PlayerPerformance> getById(@PathVariable PlayerPerformanceId id) {
        return repo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{matchId}/{playerId}")
    public PlayerPerformance getPlayerPerformanceById(@PathVariable Integer matchId, 
                                                     @PathVariable Integer playerId) {
        PlayerPerformanceId id = new PlayerPerformanceId(matchId, playerId);
        return repo.findById(id).orElse(null);
    }
    
    @GetMapping("/match/{matchId}")
    public List<PlayerPerformance> getPlayerPerformancesByMatch(@PathVariable Integer matchId) {
        return repo.findByIdMatchId(matchId);
    }
    
    @GetMapping("/player/{playerId}")
    public List<PlayerPerformance> getPlayerPerformancesByPlayer(@PathVariable Integer playerId) {
        return repo.findByIdPlayerId(playerId);
    }
    
    @PostMapping
    public PlayerPerformance createPlayerPerformance(@RequestBody PlayerPerformance playerPerformance) {
        return repo.save(playerPerformance);
    }
    
    @PutMapping("/{matchId}/{playerId}")
    public PlayerPerformance updatePlayerPerformance(@PathVariable Integer matchId, 
                                                    @PathVariable Integer playerId, 
                                                    @RequestBody PlayerPerformance playerPerformance) {
        PlayerPerformanceId id = new PlayerPerformanceId(matchId, playerId);
        playerPerformance.setId(id);
        return repo.save(playerPerformance);
    }
    
    @DeleteMapping("/{matchId}/{playerId}")
    public void deletePlayerPerformance(@PathVariable Integer matchId, @PathVariable Integer playerId) {
        PlayerPerformanceId id = new PlayerPerformanceId(matchId, playerId);
        repo.deleteById(id);
    }
}
