package com.iplproject.iplapi.controller;

import com.iplproject.iplapi.model.Player;
import com.iplproject.iplapi.repository.PlayerRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/players")
public class PlayerController {
    
    private final PlayerRepository playerRepository;
    
    public PlayerController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }
    
    @GetMapping("/names")
    public List<String> getAllPlayerNames() {
        return playerRepository.findAll()
                               .stream()
                               .map(Player::getPlayerName)
                               .toList();
    }
    
    @GetMapping("/{id}")
    public Player getPlayerById(@PathVariable Integer id) {
        return playerRepository.findById(id).orElse(null);
    }
    
    @GetMapping
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }
    
    @GetMapping("/search")
    public List<Player> searchByName(@RequestParam String name) {
        return playerRepository.findByPlayerNameContainingIgnoreCase(name);
    }
    
    @GetMapping("/team/{teamId}")
    public List<Player> getPlayersByTeam(@PathVariable Integer teamId) {
        return playerRepository.findByTeamId(teamId);
    }
    
    // FIXED: Changed parameter type from Player.Role to String
    @GetMapping("/role/{role}")
    public List<Player> getPlayersByRole(@PathVariable String role) {
        return playerRepository.findByRoleOfPlayer(role);
    }
    @PostMapping
    public Player createPlayer(@RequestBody Player player) {
        return playerRepository.save(player);
    }

    
    @PutMapping("/{id}")
    public Player updatePlayer(@PathVariable Integer id, @RequestBody Player player) {
        player.setPlayerId(id);
        return playerRepository.save(player);
    }
    
    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable Integer id) {
        playerRepository.deleteById(id);
    }
}