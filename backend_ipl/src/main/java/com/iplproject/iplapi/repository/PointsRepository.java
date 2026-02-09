package com.iplproject.iplapi.repository;

import com.iplproject.iplapi.model.Points;
import com.iplproject.iplapi.model.PointsId;
import com.iplproject.iplapi.model.Season;
import com.iplproject.iplapi.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PointsRepository extends JpaRepository<Points, PointsId> {

    // Query using entity relations
    List<Points> findBySeason(Season season);
    List<Points> findBySeason_SeasonYear(int seasonYear);
    Points findBySeasonAndTeam(Season season, Team team);
    List<Points> findByTeam(Team team);

    // Query using embedded ID fields
    List<Points> findByIdTeam(Integer teamId);
    List<Points> findByIdSeason(Integer seasonYear);
    List<Points> findByIdSeasonAndIdTeam(Integer seasonYear, Integer teamId);
}
