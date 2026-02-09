package com.iplproject.iplapi.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.iplproject.iplapi.model.Venue;
import com.iplproject.iplapi.repository.VenueRepository;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/venues")
public class VenueController {

    private final VenueRepository venueRepo;

    public VenueController(VenueRepository venueRepo) {
        this.venueRepo = venueRepo;
    }

    @GetMapping
    public List<Venue> getAllVenues() {
        return venueRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable Integer id) {
        return venueRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/city/{city}")
    public List<Venue> getVenuesByCity(@PathVariable String city) {
        return venueRepo.findByCity(city);
    }

    @GetMapping("/capacity/{min}")
    public List<Venue> getVenuesByCapacity(@PathVariable Integer min) {
        return venueRepo.findByCapacityGreaterThan(min);
    }

    @GetMapping("/search/{name}")
    public List<Venue> searchVenuesByName(@PathVariable String name) {
        return venueRepo.findByVenueNameContaining(name);
    }
    @PostMapping
    public Venue createVenue(@RequestBody Venue venue) {
        return venueRepo.save(venue);
    }
    
    @PutMapping("/{id}")
    public Venue updateVenue(@PathVariable Integer id, @RequestBody Venue venue) {
        venue.setVenueId(id);
        return venueRepo.save(venue);
    }
    
    @DeleteMapping("/{id}")
    public void deleteVenue(@PathVariable Integer id) {
    	venueRepo.deleteById(id);
    }

}
