package com.iplproject.iplapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "match_players")
public class MatchPlayer {

    @EmbeddedId
    private MatchPlayerId id;
    
    @ManyToOne
    @JoinColumn(name = "match_id", insertable = false, updatable = false)
    @JsonIgnoreProperties("matchPlayers")  // Avoid recursion
    private MatchDetail match;

    @ManyToOne
    @JoinColumn(name = "player_id", insertable = false, updatable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Player player;


    @Column(name = "team_id")
    private Integer teamId;

    @Column(name = "is_captain")
    private Boolean isCaptain;

    @Column(name = "is_keeper")
    private Boolean isKeeper;

    @Column(name = "runs_scored")
    private Integer runsScored;

    @Column(name = "balls_faced")
    private Integer ballsFaced;

    @Column(name = "fours_hit")
    private Integer foursHit;

    @Column(name = "sixes_hit")
    private Integer sixesHit;

    @Column(name = "balls_bowled")
    private Integer ballsBowled;

    @Column(name = "runs_conceded")
    private Integer runsConceded;

    private Integer wickets;

    // Getters and Setters
    public MatchPlayerId getId() { return id; }
    public void setId(MatchPlayerId id) { this.id = id; }

    public Integer getTeamId() { return teamId; }
    public void setTeamId(Integer teamId) { this.teamId = teamId; }

    public Boolean getIsCaptain() { return isCaptain; }
    public void setIsCaptain(Boolean isCaptain) { this.isCaptain = isCaptain; }

    public Boolean getIsKeeper() { return isKeeper; }
    public void setIsKeeper(Boolean isKeeper) { this.isKeeper = isKeeper; }

    public Integer getRunsScored() { return runsScored; }
    public void setRunsScored(Integer runsScored) { this.runsScored = runsScored; }

    public Integer getBallsFaced() { return ballsFaced; }
    public void setBallsFaced(Integer ballsFaced) { this.ballsFaced = ballsFaced; }

    public Integer getFoursHit() { return foursHit; }
    public void setFoursHit(Integer foursHit) { this.foursHit = foursHit; }

    public Integer getSixesHit() { return sixesHit; }
    public void setSixesHit(Integer sixesHit) { this.sixesHit = sixesHit; }

    public Integer getBallsBowled() { return ballsBowled; }
    public void setBallsBowled(Integer ballsBowled) { this.ballsBowled = ballsBowled; }

    public Integer getRunsConceded() { return runsConceded; }
    public void setRunsConceded(Integer runsConceded) { this.runsConceded = runsConceded; }

    public Integer getWickets() { return wickets; }
    public void setWickets(Integer wickets) { this.wickets = wickets; }
}
