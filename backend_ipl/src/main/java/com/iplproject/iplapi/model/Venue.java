package com.iplproject.iplapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "venues")
public class Venue {

    @Id
    @Column(name = "venue_id")
    private Integer venueId;

    @Column(name = "venue_name")
    private String venueName;

    @Column(name = "city")
    private String city;

    @Column(name = "capacity")
    private Integer capacity;
private String country;
    
    @Column(name = "pitch_type")
    private String pitchType;
    
    @Column(name = "boundary_dimensions")
    private String boundaryDimensions;
    
    private String facilities;

    // Getters and setters

    public Integer getVenueId() {
        return venueId;
    }

    public void setVenueId(Integer venueId) {
        this.venueId = venueId;
    }

    public String getName() {
        return venueName;
    }

    public void setName(String name) {
        this.venueName = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
    public String getVenueName() {
        return venueName;
    }

    public void setVenueName(String venueName) {
        this.venueName = venueName;
    }

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getFacilities() {
		return facilities;
	}

	public void setFacilities(String facilities) {
		this.facilities = facilities;
	}

}
