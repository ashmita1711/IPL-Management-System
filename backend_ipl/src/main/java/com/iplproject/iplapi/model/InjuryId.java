package com.iplproject.iplapi.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@SuppressWarnings("serial")
public class InjuryId implements Serializable {
    private Player player;
    private LocalDate matchDate;

    public InjuryId() {}

    public InjuryId(Player player, LocalDate matchDate) {
        this.player = player;
        this.matchDate = matchDate;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public LocalDate getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(LocalDate matchDate) {
        this.matchDate = matchDate;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof InjuryId)) return false;
        InjuryId that = (InjuryId) o;
        return player == that.player && matchDate.equals(that.matchDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(player, matchDate);
    }
}
