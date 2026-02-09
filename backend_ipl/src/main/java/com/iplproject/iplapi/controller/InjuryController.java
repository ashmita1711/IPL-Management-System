package com.iplproject.iplapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.iplproject.iplapi.model.Injury;
import com.iplproject.iplapi.model.InjuryId;
import com.iplproject.iplapi.model.Player;
import com.iplproject.iplapi.repository.InjuryRepository;
import com.iplproject.iplapi.repository.PlayerRepository;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/injuries")
@CrossOrigin(origins = "http://localhost:3000")
public class InjuryController {
    
    @Autowired
    private InjuryRepository injuryRepository;
    
    @Autowired
    private PlayerRepository playerRepository; // You'll need this
    
    @GetMapping
    public List<Injury> getAllInjuries() {
        return injuryRepository.findAll();
    }
    
    @GetMapping("/{playerId}/{date}")
    public Injury getInjuryById(@PathVariable Integer playerId, @PathVariable String date) {
        LocalDate injuryDate = LocalDate.parse(date);
        Player player = playerRepository.findById(playerId).orElse(null);
        if (player == null) {
            return null;
        }
        InjuryId id = new InjuryId(player, injuryDate);
        return injuryRepository.findById(id).orElse(null);
    }
    
    @GetMapping("/player/{playerId}")
    public List<Injury> getInjuriesByPlayer(@PathVariable Integer playerId) {
        return injuryRepository.findByPlayer_PlayerId(playerId);
    }
    
    @PostMapping
    public Injury createInjury(@RequestBody Injury injury) {
        return injuryRepository.save(injury);
    }
    
    @PutMapping("/{playerId}/{date}")
    public Injury updateInjury(@PathVariable Integer playerId, 
                              @PathVariable String date, 
                              @RequestBody Injury injury) {
        LocalDate injuryDate = LocalDate.parse(date);
        Player player = playerRepository.findById(playerId).orElse(null);
        if (player == null) {
            return null;
        }
        
        // Set the composite key fields directly
        injury.setPlayer(player);
        injury.setMatchDate(injuryDate);
        
        return injuryRepository.save(injury);
    }
    
    @DeleteMapping("/{playerId}/{date}")
    public void deleteInjury(@PathVariable Integer playerId, @PathVariable String date) {
        LocalDate injuryDate = LocalDate.parse(date);
        Player player = playerRepository.findById(playerId).orElse(null);
        if (player != null) {
            InjuryId id = new InjuryId(player, injuryDate);
            injuryRepository.deleteById(id);
        }
    }
}