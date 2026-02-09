package com.iplproject.iplapi.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "players")
public class Player {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private int playerId;
    
    @Column(name = "player_name")
    private String playerName;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", insertable = false, updatable = false)
    @JsonBackReference("player-team")
    private Team team;

    @Column(name = "team_id")
    private int teamId;

    
    
    @Column(name = "role_of_player")
    private String roleOfPlayer;
    
    @Column(name = "nationality")
    private String nationality;
    
    @Column(name = "dob")
    private LocalDate dob;
    
    @Column(name = "batting_style")
    private String battingStyle;
    
    @Column(name = "balling_style")
    private String ballingStyle;
    
    @Column(name = "photo_of_player")
    private String photoOfPlayer;
    
    @Column(name = "jersey_number")
    private Integer jerseyNumber;
    
    @Column(name = "height_cm")
    private Integer heightCm;
    
    @Column(name = "weight_kg")
    private Integer weightKg;
    
    @Column(name = "age_of_players")
    private Integer playersAge;
    
    @Column(name = "is_overseas")
    private Boolean isOverseas;
    
    @Column(name = "price_bought", precision = 15, scale = 2, nullable = true)
    private BigDecimal priceBought;
    
    @Column(name = "current_form_rating")
    private Integer currentFormRating;
    
    public enum Role {
        bat, bowl, all_rounder
    }
    
    // === Getters and Setters ===
    public int getPlayerId() {
        return playerId;
    }
    
    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }
    
    public String getPlayerName() {
        return playerName;
    }
    
    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }
    
    // FIXED: Changed method name to match field name
    public String getRoleOfPlayer() {
        return roleOfPlayer;
    }
    
    public void setRoleOfPlayer(String roleOfPlayer) {
        this.roleOfPlayer = roleOfPlayer;
    }
    
    // Keep this for backward compatibility if needed
    public String getRole() {
        return roleOfPlayer;
    }
    
    public void setRole(String role) {
        this.roleOfPlayer = role;
    }
    
    public int getTeamId() {
        return teamId;
    }
    
    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }
    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    
    public String getNationality() {
        return nationality;
    }
    
    public void setNationality(String nationality) {
        this.nationality = nationality;
    }
    
    public LocalDate getDob() {
        return dob;
    }
    
    public void setDob(LocalDate dob) {
        this.dob = dob;
    }
    
    public String getBattingStyle() {
        return battingStyle;
    }
    
    public void setBattingStyle(String battingStyle) {
        this.battingStyle = battingStyle;
    }
    
    public String getBallingStyle() {
        return ballingStyle;
    }
    
    public void setBallingStyle(String ballingStyle) {
        this.ballingStyle = ballingStyle;
    }
    
    public String getPhotoOfPlayer() {
        return photoOfPlayer;
    }
    
    public void setPhotoOfPlayer(String photoOfPlayer) {
        this.photoOfPlayer = photoOfPlayer;
    }
    
    // ADDED: Missing getters and setters for additional fields
    public Integer getJerseyNumber() {
        return jerseyNumber;
    }
    
    public void setJerseyNumber(Integer jerseyNumber) {
        this.jerseyNumber = jerseyNumber;
    }
    
    public Integer getHeightCm() {
        return heightCm;
    }
    
    public void setHeightCm(Integer heightCm) {
        this.heightCm = heightCm;
    }
    
    public Integer getWeightKg() {
        return weightKg;
    }
    
    public void setWeightKg(Integer weightKg) {
        this.weightKg = weightKg;
    }
    
    public Integer getplayersAge() {
        return playersAge;
    }
    
    public void setPlayersAge(Integer playersAge) {
        this.playersAge = playersAge;
    }

    
    public Boolean getIsOverseas() {
        return isOverseas;
    }
    
    public void setIsOverseas(Boolean isOverseas) {
        this.isOverseas = isOverseas;
    }
    
    public BigDecimal getPriceBought() {
        return priceBought;
    }
    
    public void setPriceBought(BigDecimal priceBought) {
        this.priceBought = priceBought;
    }
    
    public Integer getCurrentFormRating() {
        return currentFormRating;
    }
    
    public void setCurrentFormRating(Integer currentFormRating) {
        this.currentFormRating = currentFormRating;
    }
}