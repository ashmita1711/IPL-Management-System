package com.iplproject.iplapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@SuppressWarnings("serial")
@Embeddable
public class MatchPlayerId implements Serializable {

    @Column(name = "match_id")
    private Integer matchId;

    @Column(name = "player_id")
    private Integer playerId;

    public MatchPlayerId() {}

    public MatchPlayerId(Integer matchId, Integer playerId) {
        this.matchId = matchId;
        this.playerId = playerId;
    }

    public Integer getMatchId() { return matchId; }
    public void setMatchId(Integer matchId) { this.matchId = matchId; }

    public Integer getPlayerId() { return playerId; }
    public void setPlayerId(Integer playerId) { this.playerId = playerId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MatchPlayerId)) return false;
        MatchPlayerId that = (MatchPlayerId) o;
        return Objects.equals(matchId, that.matchId) &&
               Objects.equals(playerId, that.playerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(matchId, playerId);
    }
}
