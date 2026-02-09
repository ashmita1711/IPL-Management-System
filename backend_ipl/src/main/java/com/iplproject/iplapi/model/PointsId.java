package com.iplproject.iplapi.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;
@Embeddable
public class PointsId implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer  season;
    private Integer  team;

    // Default constructor
    public PointsId() {}

    // Param constructor
    public PointsId(Integer  season, Integer  team) {
        this.season = season ;
        this.team = team ;
    }

    // Getters and Setters
    public Integer getSeason() {
        return season;
    }

    public void setSeason(Integer season) {
        this.season = season;
    }

    public Integer getTeam() {
        return team;
    }

    public void setTeam(Integer team) {
        this.team = team;
    }

    // equals() and hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PointsId pointsId = (PointsId) o;
        return Objects.equals(season, pointsId.season) && 
               Objects.equals(team, pointsId.team);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(season, team);
    }
}
