package com.iplproject.iplapi.repository;

import com.iplproject.iplapi.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Integer> {
	
}

