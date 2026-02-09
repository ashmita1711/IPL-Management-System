package com.iplproject.iplapi.controller;

import com.iplproject.iplapi.model.MatchDetail;

import com.iplproject.iplapi.model.Season;
import com.iplproject.iplapi.model.Team;
import com.iplproject.iplapi.repository.MatchRepository;
import com.iplproject.iplapi.repository.SeasonRepository;
import com.iplproject.iplapi.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/seasons")
public class SeasonController {

    @Autowired
    private SeasonRepository seasonRepository;

    @Autowired
    private MatchRepository matchRepository;
    
    @Autowired
    private TeamRepository teamRepository;


    // 1. Get all seasons
    @GetMapping
    public List<Season> getAllSeasons() {
        return seasonRepository.findAll();
    }
    // 2. Get specific season by year
    @GetMapping("/{year}")
    public ResponseEntity<Season> getSeasonByYear(@PathVariable int year) {
        return seasonRepository.findById(year)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. Get all matches in a specific season
    @GetMapping("/{year}/matches")
    public ResponseEntity<List<MatchDetail>> getMatchesBySeason(@PathVariable int year) {
        List<MatchDetail> matches = matchRepository.findBySeason_SeasonYear(year);
        return ResponseEntity.ok(matches);
    }

    // 4. Get a specific match by ID inside a season
    @GetMapping("/{year}/matches/{matchId}")
    public ResponseEntity<MatchDetail> getMatchInSeason(@PathVariable int year, @PathVariable int matchId) {
        Optional<MatchDetail> matchOpt = matchRepository.findById(matchId);

        if (matchOpt.isPresent()) {
            MatchDetail match = matchOpt.get();
            if (match.getSeason() != null && match.getSeason().getSeasonYear() == year) {
                return ResponseEntity.ok(match);
            }
        }

        return ResponseEntity.notFound().build();
    }
    
//    @PostMapping
//    public Season createSeason(@RequestBody Season season) {
//        return seasonRepository.save(season);
//    }
    
//    @PostMapping
//    public Season createSeason(@RequestBody Season season) {
//        System.out.println("Received season: " + season);
//        return seasonRepository.save(season);
//    @PostMapping
//    public ResponseEntity<Season> createSeason(@RequestBody Season season) {
//        try {
//            Season saved = seasonRepository.save(season);
//            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }

    @PostMapping
    public ResponseEntity<Season> addSeason(@RequestBody Season season) {
        try {
            if (season.getWinnerTeam() != null) {
                Team winner = teamRepository.findById(season.getWinnerTeam().getTeamId())
                        .orElseThrow(() -> new RuntimeException("Winner team not found"));
                season.setWinnerTeam(winner);
            }

            if (season.getRunnerUpTeam() != null) {
                Team runnerUp = teamRepository.findById(season.getRunnerUpTeam().getTeamId())
                        .orElseThrow(() -> new RuntimeException("Runner-up team not found"));
                season.setRunnerUpTeam(runnerUp);
            }

            Season savedSeason = seasonRepository.save(season);
            return ResponseEntity.ok(savedSeason);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }




    @PutMapping("/{year}")
    public Season updateSeason(@PathVariable Integer year, @RequestBody Season season) {
        season.setSeasonYear(year);
        return seasonRepository.save(season);
    }
    
    @DeleteMapping("/{year}")
    public void deleteSeason(@PathVariable Integer year) {
        seasonRepository.deleteById(year);
    }

}
