package com.iplproject.iplapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.iplproject.iplapi.model.Venue;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Integer> {

    List<Venue> findByCity(String city);
    List<Venue> findByCapacityGreaterThan(Integer capacity);
    List<Venue> findByVenueNameContaining(String namePart); // ✅ FIXED
}
