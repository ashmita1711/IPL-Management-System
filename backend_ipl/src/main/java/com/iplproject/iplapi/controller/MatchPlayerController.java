package com.iplproject.iplapi.controller;

import com.iplproject.iplapi.model.MatchPlayer;
import com.iplproject.iplapi.model.MatchPlayerId;
import com.iplproject.iplapi.repository.MatchPlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/matchplayers")
public class MatchPlayerController {

    @Autowired
    private MatchPlayerRepository repository;

    @GetMapping
    public List<MatchPlayer> getAllMatchPlayers() {
        return repository.findAll();
    }
    @GetMapping("/match/{matchId}/team/{teamId}")
    public List<MatchPlayer> getPlayersByMatchAndTeam(@PathVariable Integer matchId, @PathVariable Integer teamId) {
        return repository.findByIdMatchIdAndTeamId(matchId, teamId);
    }

    @GetMapping("/bymatch/{matchId}")
    public List<MatchPlayer> getByMatch(@PathVariable Integer matchId) {
        return repository.findByIdMatchId(matchId);
    }

    @GetMapping("/byplayer/{playerId}")
    public List<MatchPlayer> getByPlayer(@PathVariable Integer playerId) {
        return repository.findByIdPlayerId(playerId);
    }
 // MatchPlayerController.java
    @GetMapping("/match/{matchId}")
    public List<MatchPlayer> getPlayersByMatchId(@PathVariable Integer matchId) {
        return repository.findByIdMatchId(matchId);
    }
    @GetMapping("/{matchId}/players")
    public List<Integer> getPlayersByMatch(@PathVariable Integer matchId) {
        List<MatchPlayer> matchPlayers = repository.findByIdMatchId(matchId);
        return matchPlayers.stream()
                .map(mp -> mp.getId().getPlayerId())
                .collect(Collectors.toList());
    }
    
    @GetMapping("/{matchId}/{playerId}")
    public MatchPlayer getMatchPlayerById(@PathVariable Integer matchId, @PathVariable Integer playerId) {
        MatchPlayerId id = new MatchPlayerId(matchId, playerId);
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public MatchPlayer createMatchPlayer(@RequestBody MatchPlayer matchPlayer) {
        return repository.save(matchPlayer);
    }
    
    @PutMapping("/{matchId}/{playerId}")
    public MatchPlayer updateMatchPlayer(@PathVariable Integer matchId, 
                                        @PathVariable Integer playerId, 
                                        @RequestBody MatchPlayer matchPlayer) {
        MatchPlayerId id = new MatchPlayerId(matchId, playerId);
        matchPlayer.setId(id);
        return repository.save(matchPlayer);
    }
    
    @DeleteMapping("/{matchId}/{playerId}")
    public void deleteMatchPlayer(@PathVariable Integer matchId, @PathVariable Integer playerId) {
        MatchPlayerId id = new MatchPlayerId(matchId, playerId);
        repository.deleteById(id);
    }

}
