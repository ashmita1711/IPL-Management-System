package com.iplproject.iplapi.controller;

import com.iplproject.iplapi.model.Points;
import com.iplproject.iplapi.repository.PointsRepository;
import com.iplproject.iplapi.repository.SeasonRepository;
import com.iplproject.iplapi.repository.TeamRepository;
import com.iplproject.iplapi.model.Season;
import com.iplproject.iplapi.model.Team;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/points")
public class PointsController {

    @Autowired
    private PointsRepository pointsRepository;

    @Autowired
    private SeasonRepository seasonRepository;

    @Autowired
    private TeamRepository teamRepository;

    // 1. Get all points
    @GetMapping
    public List<Points> getAllPoints() {
        return pointsRepository.findAll();
    }

    // 2. Get all points for a given season year
    @GetMapping("/season/{year}")
    public ResponseEntity<List<Points>> getPointsBySeason(@PathVariable int year) {
        List<Points> pointsList = pointsRepository.findBySeason_SeasonYear(year);
        if (pointsList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pointsList);
    }

    // 3. Get specific points for a team in a season
    @GetMapping("/season/{year}/team/{teamId}")
    public ResponseEntity<Points> getPointsBySeasonAndTeam(@PathVariable int year, @PathVariable int teamId) {
        Optional<Season> season = seasonRepository.findById(year);
        Optional<Team> team = teamRepository.findById(teamId);

        if (season.isPresent() && team.isPresent()) {
            Points points = pointsRepository.findBySeasonAndTeam(season.get(), team.get());
            if (points != null) {
                return ResponseEntity.ok(points);
            }
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/team/{teamId}")
    public List<Points> getPointsByTeam(@PathVariable Integer teamId) {
        return pointsRepository.findByIdTeam(teamId); // ✅ Correct method
    }

}
