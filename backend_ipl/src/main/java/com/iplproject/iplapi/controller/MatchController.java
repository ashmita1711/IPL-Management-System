package com.iplproject.iplapi.controller;

import com.iplproject.iplapi.model.MatchDetail;
import com.iplproject.iplapi.repository.MatchRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/matches")
public class MatchController {
    
    private final MatchRepository matchRepository;
    
    public MatchController(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }
    
    // ✅ Get a match by its ID
    @GetMapping("/{id}")
    public ResponseEntity<MatchDetail> getMatchById(@PathVariable Integer id) {
        Optional<MatchDetail> matchOpt = matchRepository.findById(id);
        return matchOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // ✅ Get matches by season year
    @GetMapping("/season/{year}")
    public List<MatchDetail> getBySeasonYear(@PathVariable Integer year) {
        return matchRepository.findBySeason_SeasonYear(year);
    }
    
    // ✅ Get matches involving a team
    @GetMapping("/team/{teamId}")
    public List<MatchDetail> getByTeam(@PathVariable Integer teamId) {
        return matchRepository.findByTeam1_TeamIdOrTeam2_TeamId(teamId, teamId);
    }
    
    // ✅ Get matches by venue
    @GetMapping("/venue/{venueId}")
    public List<MatchDetail> getByVenue(@PathVariable Integer venueId) {
        return matchRepository.findByVenueId(venueId);
    }
    
    // ✅ Get matches won by a team
    @GetMapping("/winner/{teamId}")
    public List<MatchDetail> getByWinnerTeam(@PathVariable Integer teamId) {
        return matchRepository.findByWinnerTeamId(teamId);
    }
    
    // ✅ Get matches where a player won 'Player of the Match'
    @GetMapping("/player-of-match/{playerId}")
    public List<MatchDetail> getByPlayerOfMatch(@PathVariable Integer playerId) {
        return matchRepository.findByPlayerOfMatchId(playerId);
    }
    
    // 🆕 ADDED: Get matches where a player participated
    @GetMapping("/player/{playerId}")
    public List<MatchDetail> getMatchesByPlayer(@PathVariable Integer playerId) {
        return matchRepository.findMatchesByPlayerId(playerId);
    }
    
    // ✅ Get all matches
    @GetMapping
    public List<MatchDetail> getAllMatches() {
        return matchRepository.findAll();
    }
    
    // This endpoint seems incorrect - it should return players, not matches
    // @GetMapping("/{matchId}/players")
    // public List<MatchDetail> getPlayersInMatch(@PathVariable Integer matchId) {
    //     return matchRepository.findPlayersByMatchId(matchId);
    // }
    
    @PostMapping
    public MatchDetail createMatch(@RequestBody MatchDetail match) {
        return matchRepository.save(match);
    }
    
    @PutMapping("/{id}")
    public MatchDetail updateMatch(@PathVariable Integer id, @RequestBody MatchDetail match) {
        match.setMatchId(id);
        return matchRepository.save(match);
    }
    
    @DeleteMapping("/{id}")
    public void deleteMatch(@PathVariable Integer id) {
        matchRepository.deleteById(id);
    }
}