package com.iplproject.iplapi.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlayerPerformanceId implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer matchId;
    private Integer playerId;

    public PlayerPerformanceId() {}

    public PlayerPerformanceId(Integer matchId, Integer playerId) {
        this.matchId = matchId;
        this.playerId = playerId;
    }

    public Integer getMatchId() {
        return matchId;
    }

    public void setMatchId(Integer matchId) {
        this.matchId = matchId;
    }

    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlayerPerformanceId)) return false;
        PlayerPerformanceId that = (PlayerPerformanceId) o;
        return Objects.equals(matchId, that.matchId) &&
               Objects.equals(playerId, that.playerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(matchId, playerId);
    }
}
