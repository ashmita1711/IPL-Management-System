package com.iplproject.iplapi.model;


import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "player_career_stats")
public class PlayerCareerStats {
    @Id
    @Column(name = "player_id")
    private Integer playerId;
    
    @Column(name = "total_matches")
    private Integer totalMatches;
    
    @Column(name = "total_runs")
    private Integer totalRuns;
    
    @Column(name = "total_wickets")
    private Integer totalWickets;
    
    @Column(name = "highest_score")
    private Integer highestScore;
    
    @Column(name = "best_bowling_figures")
    private String bestBowlingFigures;
    
    private Integer centuries;
    
    @Column(name = "half_centuries")
    private Integer halfCenturies;
    
    @Column(name = "average_batting")
    private BigDecimal averageBatting;
    
    @Column(name = "average_bowling")
    private BigDecimal averageBowling;
    
    @Column(name = "total_sixes")
    private Integer totalSixes;
    
    @Column(name = "total_fours")
    private Integer totalFours;

	public Integer getCenturies() {
		return centuries;
	}

	public void setCenturies(Integer centuries) {
		this.centuries = centuries;
	}

	public void setPlayerId(Integer playerId2) {
		// TODO Auto-generated method stub
		
	}
}

