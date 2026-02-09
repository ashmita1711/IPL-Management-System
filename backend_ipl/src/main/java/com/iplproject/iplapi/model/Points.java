package com.iplproject.iplapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
public class Points {

    @EmbeddedId
    private PointsId id;

    @ManyToOne
    @MapsId("season") // field name in PointsId
    @JoinColumn(name = "season_year")
    private Season season;

    @ManyToOne
    @MapsId("team") // field name in PointsId
    @JoinColumn(name = "team_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Team team;

    private int matchesPlayed;
    private int wins;
    private int loss;
    private int tiesOfTeam;
    private int noResult;
    private int points;
    private double netRunRate;

    // Getters and Setters

    public PointsId getId() {
        return id;
    }

    public void setId(PointsId id) {
        this.id = id;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public int getMatchesPlayed() {
        return matchesPlayed;
    }

    public void setMatchesPlayed(int matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getLoss() {
        return loss;
    }

    public void setLoss(int loss) {
        this.loss = loss;
    }

    public int getTiesOfTeam() {
        return tiesOfTeam;
    }

    public void setTiesOfTeam(int tiesOfTeam) {
        this.tiesOfTeam = tiesOfTeam;
    }

    public int getNoResult() {
        return noResult;
    }

    public void setNoResult(int noResult) {
        this.noResult = noResult;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public double getNetRunRate() {
        return netRunRate;
    }

    public void setNetRunRate(double netRunRate) {
        this.netRunRate = netRunRate;
    }
}
