package com.iplproject.iplapi.controller;

import com.iplproject.iplapi.model.Team;
import com.iplproject.iplapi.repository.TeamRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamRepository teamRepository;

    public TeamController(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @GetMapping
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @GetMapping("/{id}")
    public Team getTeamById(@PathVariable Integer id) {
        return teamRepository.findById(id).orElse(null);
    }
    @PostMapping
    public Team createTeam(@RequestBody Team team) {
        return teamRepository.save(team);
    }
    
    @PutMapping("/{id}")
    public Team updateTeam(@PathVariable Integer id, @RequestBody Team team) {
        team.setTeamId(id);
        return teamRepository.save(team);
    }
    
    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable Integer id) {
        teamRepository.deleteById(id);
    }
}
