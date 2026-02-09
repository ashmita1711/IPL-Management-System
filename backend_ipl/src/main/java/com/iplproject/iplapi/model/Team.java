package com.iplproject.iplapi.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "teams")
public class Team {
    @Id
    @Column(name = "team_id")
    private Integer teamId;


    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("player-team")
    private List<Player> players;

    
    @Column(name = "team_name")
    private String teamName;


    @Column(name = "captain_id")
    private Integer captainId;

    private String coach;

    private String owner_name;

    private String logo;
    @Transient
    public Integer getId() {
        return teamId;
    }
    
    @Column(name = "home_ground")
    private String homeGround;
    
//    @Column(name = "home_venue_id")
//    private Integer homeVenueId;
    @Column(name = "founded_year")
    private Integer foundedYear;
    
    @Column(name = "team_color")
    private String teamColor;
    
    @Column(name = "total_championships")
    private Integer totalChampionships;
    
    @Column(name = "social_media_handles", columnDefinition = "JSON")
    private String socialMediaHandles;

    @OneToMany(mappedBy = "winnerTeam")
    @JsonBackReference("team-winner")
    private List<Season> seasonsWon;


    // Getters and setters
    public Integer getTeamId() { return teamId; }
    public void setTeamId(Integer teamId) { this.teamId = teamId; }


    public Integer getCaptainId() { return captainId; }
    public void setCaptainId(Integer captainId) { this.captainId = captainId; }

    public String getCoach() { return coach; }
    public void setCoach(String coach) { this.coach = coach; }

    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }
    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
	public String getOwner_name() {
		return owner_name;
	}
	public void setOwner_name(String owner_name) {
		this.owner_name = owner_name;
	}
	
	public Integer getFoundedYear() {
	    return foundedYear;
	}
	public void setFoundedYear(Integer foundedYear) {
	    this.foundedYear = foundedYear;
	}

	public String getTeamColor() {
	    return teamColor;
	}
	public void setTeamColor(String teamColor) {
	    this.teamColor = teamColor;
	}

	public Integer getTotalChampionships() {
	    return totalChampionships;
	}
	public void setTotalChampionships(Integer totalChampionships) {
	    this.totalChampionships = totalChampionships;
	}

	public String getSocialMediaHandles() {
	    return socialMediaHandles;
	}
	public void setSocialMediaHandles(String socialMediaHandles) {
	    this.socialMediaHandles = socialMediaHandles;
	}

	public List<Season> getSeasonsWon() {
	    return seasonsWon;
	}
	public void setSeasonsWon(List<Season> seasonsWon) {
	    this.seasonsWon = seasonsWon;
	}


public String getHomeGround() {
    return homeGround;
}

public void setHomeGround(String homeGround) {
    this.homeGround = homeGround;
}
public List<Player> getPlayers() {
    return players;
}

public void setPlayers(List<Player> players) {
    this.players = players;
}


}
