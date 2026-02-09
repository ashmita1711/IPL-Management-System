package com.iplproject.iplapi.model;

import java.io.Serializable;
import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@SuppressWarnings({ "unused", "serial" })
@Entity
@Table(name = "seasons")
public class Season implements Serializable {
	
	@OneToMany(mappedBy = "season")
	@JsonIgnore
	private List<MatchDetail> matches;


	@Id
    @Column(name = "season_year")
    private Integer seasonYear;

	@Column(name = "start_date")
	private LocalDate startDate;

	@Column(name = "end_date")
	private LocalDate endDate;
    
	@ManyToOne
	@JoinColumn(name = "winner_team_id")
	private Team winnerTeam;

	@ManyToOne
	@JoinColumn(name = "runner_up_team_id")
	private Team runnerUpTeam;
	
    @Column(name = "season_id")
    private Integer seasonId;
    
    @Column(name = "total_teams")
    private Integer totalTeams;
    
    @Column(name = "total_matches")
    private Integer totalMatches;
    
    @Column(name = "prize_money")
    private BigDecimal prizeMoney; 
    
    @Enumerated(EnumType.STRING)
    private Status status;
    
    public enum Status {
        upcoming, ongoing, completed
    }
    
    //  DEFAULT CONSTRUCTOR 
    public Season() {
        // Required for @RequestBody
    }
    
    // Getters and Setters

    public Integer getSeasonYear() {
        return seasonYear;
    }

    public void setSeasonYear(Integer seasonYear) {
        this.seasonYear = seasonYear;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Team getWinnerTeam() {
        return winnerTeam;
    }

    public void setWinnerTeam(Team winnerTeam) {
        this.winnerTeam = winnerTeam;
    }
    
    public Integer getSeasonId() {
        return seasonId;
    }

    public void setSeasonId(Integer seasonId) {
        this.seasonId = seasonId;
    }

    public Integer getTotalTeams() {
        return totalTeams;
    }

    public void setTotalTeams(Integer totalTeams) {
        this.totalTeams = totalTeams;
    }

    public Integer getTotalMatches() {
        return totalMatches;
    }

    public void setTotalMatches(Integer totalMatches) {
        this.totalMatches = totalMatches;
    }

    public BigDecimal getPrizeMoney() {
        return prizeMoney;
    }

    public void setPrizeMoney(BigDecimal prizeMoney) {
        this.prizeMoney = prizeMoney;
    }

    public Team getRunnerUpTeam() {
        return runnerUpTeam;
    }

    public void setRunnerUpTeam(Team runnerUpTeam) {
        this.runnerUpTeam = runnerUpTeam;
    }


    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

}
