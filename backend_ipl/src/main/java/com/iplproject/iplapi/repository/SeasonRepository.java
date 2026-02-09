package com.iplproject.iplapi.repository;

import com.iplproject.iplapi.model.Season;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SeasonRepository extends JpaRepository<Season, Integer> {

	List<Season> getMatchesBySeasonYear(int year);
    // No extra methods needed now
}
