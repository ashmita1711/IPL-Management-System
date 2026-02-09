package com.iplproject.iplapi.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@IdClass(InjuryId.class)
public class Injury {

    @Id
    @ManyToOne
    @JoinColumn(name = "player_id")
    private Player player;

    @Id
    private LocalDate matchDate;

    private String typeOfInjury;
    private String recoveryTime;

    @ManyToOne
    @JoinColumn(name = "replaced_player")
    private Player replacedPlayer;

    // Getters and Setters
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

    public String getTypeOfInjury() {
        return typeOfInjury;
    }

    public void setTypeOfInjury(String typeOfInjury) {
        this.typeOfInjury = typeOfInjury;
    }

    public String getRecoveryTime() {
        return recoveryTime;
    }

    public void setRecoveryTime(String recoveryTime) {
        this.recoveryTime = recoveryTime;
    }

    public Player getReplacedPlayer() {
        return replacedPlayer;
    }

    public void setReplacedPlayer(Player replacedPlayer) {
        this.replacedPlayer = replacedPlayer;
    }

	public void setId(InjuryId id) {
		// TODO Auto-generated method stub
		
	}
}
