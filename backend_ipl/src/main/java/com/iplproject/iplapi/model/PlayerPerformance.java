package com.iplproject.iplapi.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "player_performance")
public class PlayerPerformance {
    @EmbeddedId
    private PlayerPerformanceId id;

    private Integer runs_scored;
    private Integer balls_faced;
    private Integer wickets;
    private Double overs_bowled;
    private Integer run_conceded;
    private Integer catch1;
    private Integer run_outs;
    private Integer sixes;
    private Integer fours;
    private Integer catches;
    private Integer maidens;
    private Integer stumpings;
    @Column(name = "strike_rate")
    private BigDecimal strikeRate;
    
    @Column(name = "economy_rate")
    private BigDecimal economyRate;
    
    @Column(name = "dot_balls")
    private Integer dotBalls;
    
    @Column(name = "dismissal_type")
    private String dismissalType;
    
    @Column(name = "partnership_runs")
    private Integer partnershipRuns;

    public PlayerPerformanceId getId() { return id; }
    public void setId(PlayerPerformanceId id) { this.id = id; }
    public Integer getRuns_scored() { return runs_scored; }
    public void setRuns_scored(Integer runs_scored) { this.runs_scored = runs_scored; }
    public Integer getBalls_faced() { return balls_faced; }
    public void setBalls_faced(Integer balls_faced) { this.balls_faced = balls_faced; }
    public Integer getWickets() { return wickets; }
    public void setWickets(Integer wickets) { this.wickets = wickets; }
    public Double getOvers_bowled() { return overs_bowled; }
    public void setOvers_bowled(Double overs_bowled) { this.overs_bowled = overs_bowled; }
    public Integer getRun_conceded() { return run_conceded; }
    public void setRun_conceded(Integer run_conceded) { this.run_conceded = run_conceded; }
    public Integer getCatch() { return catch1; }
    public void setCatch(Integer catch1) { this.catch1 = catch1; }
    public Integer getRun_outs() { return run_outs; }
    public void setRun_outs(Integer run_outs) { this.run_outs = run_outs; }
    public Integer getSixes() { return sixes; }
    public void setSixes(Integer sixes) { this.sixes = sixes; }
    public Integer getFours() { return fours; }
    public void setFours(Integer fours) { this.fours = fours; }
    public Integer getCatches() { return catches; }
    public void setCatches(Integer catches) { this.catches = catches; }
    public Integer getMaidens() { return maidens; }
    public void setMaidens(Integer maidens) { this.maidens = maidens; }
    public Integer getStumpings() { return stumpings; }
    public void setStumpings(Integer stumpings) { this.stumpings = stumpings; }
}