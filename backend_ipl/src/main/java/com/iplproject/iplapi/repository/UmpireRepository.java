package com.iplproject.iplapi.repository;

import com.iplproject.iplapi.model.Umpire;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UmpireRepository extends JpaRepository<Umpire, Integer> {
    
    List<Umpire> findByUmpireNameContainingIgnoreCase(String umpireName); // ✅ CORRECT
}
