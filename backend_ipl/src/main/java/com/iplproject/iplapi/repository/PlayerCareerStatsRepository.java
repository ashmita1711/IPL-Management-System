package com.iplproject.iplapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iplproject.iplapi.model.PlayerCareerStats;

@Repository
public interface PlayerCareerStatsRepository extends JpaRepository<PlayerCareerStats, Integer> {
}