package com.iplproject.iplapi.model;

import jakarta.persistence.*;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "matches")
public class MatchDetail {

    @Id
    @Column(name = "match_id")
    private Integer matchId;
    @Temporal(TemporalType.DATE)
    @Column(name = "match_date")  // Replace with your actual column name
    private Date date;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("match")  // Prevent infinite recursion
    private List<MatchPlayer> matchPlayers;

    public List<MatchPlayer> getMatchPlayers() {
        return matchPlayers;
    }

    public void setMatchPlayers(List<MatchPlayer> matchPlayers) {
        this.matchPlayers = matchPlayers;
    }

//
//    @Column(name = "team1_id")
//    private Integer team1Id;
//
//    @Column(name = "team2_id")
//    private Integer team2Id;
//
//    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team1_id")
    private Team team1;  

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team2_id")
    private Team team2;  


    @Column(name = "venue_id")
    private Integer venueId;

    @Column(name = "tossWinner_id")
    private Integer tossWinnerId;

    @ManyToOne
    @JoinColumn(name = "season_year", referencedColumnName = "season_year")
    private Season season;

    @Column(name = "toss_decision")
    private String tossDecision;

    @Column(name = "winnerTeam_id")
    private Integer winnerTeamId;

    @Column(name = "result_type")
    private String resultType;

    private Integer umpire1;
    private Integer umpire2;

    @Column(name = "player_of_match_id")
    private Integer playerOfMatchId;

    @Column(name = "win_by_runs")
    private Integer winByRuns;

    @Column(name = "win_by_wickets")
    private Integer winByWickets;

    @Column(name = "team1_wickets")
    private Integer team1Wickets;

    @Column(name = "team2_wickets")
    private Integer team2Wickets;
    
    @Column(name = "match_number")
    private Integer matchNumber;
    
    @Column(name = "is_playoff")
    private Boolean isPlayoff;
    
    private String weather;
    private Integer attendance;
    
    @Column(name = "team1_score")
    private String team1Score;
    
    @Column(name = "team2_score")
    private String team2Score;
    
    @Column(name = "match_duration")
    private LocalTime matchDuration;
    
    public enum TossDecision {
        bat, bowl
    }
    
    public enum ResultType {
        normal, tie, super_over, no_result
    }

    // Getters and Setters
    
    public String getTeam1Score() {
        return team1Score;
    }

    public void setTeam1Score(String team1Score) {
        this.team1Score = team1Score;
    }

    public String getTeam2Score() {
        return team2Score;
    }

    public void setTeam2Score(String team2Score) {
        this.team2Score = team2Score;
    }

    public LocalTime getMatchDuration() {
        return matchDuration;
    }

    public void setMatchDuration(LocalTime matchDuration) {
        this.matchDuration = matchDuration;
    }

    public Integer getMatchNumber() {
        return matchNumber;
    }

    public void setMatchNumber(Integer matchNumber) {
        this.matchNumber = matchNumber;
    }

    public Boolean getIsPlayoff() {
        return isPlayoff;
    }

    public void setIsPlayoff(Boolean isPlayoff) {
        this.isPlayoff = isPlayoff;
    }


    public Integer getMatchId() {
        return matchId;
    }

    public void setMatchId(Integer matchId) {
        this.matchId = matchId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    public Team getTeam1() {
        return team1;
    }

    public void setTeam1(Team team1) {
        this.team1 = team1;
    }

    public Team getTeam2() {
        return team2;
    }

    public void setTeam2(Team team2) {
        this.team2 = team2;
    }

    public Integer getVenueId() {
        return venueId;
    }

    public void setVenueId(Integer venueId) {
        this.venueId = venueId;
    }

    public Integer getTossWinnerId() {
        return tossWinnerId;
    }

    public void setTossWinnerId(Integer tossWinnerId) {
        this.tossWinnerId = tossWinnerId;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public String getTossDecision() {
        return tossDecision;
    }

    public void setTossDecision(String tossDecision) {
        this.tossDecision = tossDecision;
    }

    public Integer getWinnerTeamId() {
        return winnerTeamId;
    }

    public void setWinnerTeamId(Integer winnerTeamId) {
        this.winnerTeamId = winnerTeamId;
    }

    public String getResultType() {
        return resultType;
    }

    public void setResultType(String resultType) {
        this.resultType = resultType;
    }

    public Integer getUmpire1() {
        return umpire1;
    }

    public void setUmpire1(Integer umpire1) {
        this.umpire1 = umpire1;
    }

    public Integer getUmpire2() {
        return umpire2;
    }

    public void setUmpire2(Integer umpire2) {
        this.umpire2 = umpire2;
    }

    public Integer getPlayerOfMatchId() {
        return playerOfMatchId;
    }

    public void setPlayerOfMatchId(Integer playerOfMatchId) {
        this.playerOfMatchId = playerOfMatchId;
    }

    public Integer getWinByRuns() {
        return winByRuns;
    }

    public void setWinByRuns(Integer winByRuns) {
        this.winByRuns = winByRuns;
    }

    public Integer getWinByWickets() {
        return winByWickets;
    }

    public void setWinByWickets(Integer winByWickets) {
        this.winByWickets = winByWickets;
    }

    public Integer getTeam1Wickets() {
        return team1Wickets;
    }

    public void setTeam1Wickets(Integer team1Wickets) {
        this.team1Wickets = team1Wickets;
    }

    public Integer getTeam2Wickets() {
        return team2Wickets;
    }

    public void setTeam2Wickets(Integer team2Wickets) {
        this.team2Wickets = team2Wickets;
    }

	public Integer getAttendance() {
		return attendance;
	}

	public void setAttendance(Integer attendance) {
		this.attendance = attendance;
	}

	public String getWeather() {
		return weather;
	}

	public void setWeather(String weather) {
		this.weather = weather;
	}
}
