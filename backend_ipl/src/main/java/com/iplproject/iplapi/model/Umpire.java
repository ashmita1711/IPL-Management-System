package com.iplproject.iplapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "umpires")
public class Umpire {

    @Id
    @Column(name = "umpire_id")
    private Integer umpireId;

    @Column(name = "umpire_name")  
    private String umpireName;

    public Integer getUmpireId() {
        return umpireId;
    }

    public void setUmpireId(Integer umpireId) {
        this.umpireId = umpireId;
    }

    public String getUmpireName() {
        return umpireName;
    }

    public void setUmpireName(String umpireName) {
        this.umpireName = umpireName;
    }
}
