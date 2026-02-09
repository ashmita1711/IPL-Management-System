package com.iplproject.iplapi.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iplproject.iplapi.model.Injury;
import com.iplproject.iplapi.model.InjuryId;

import java.util.List;

@Repository
public interface InjuryRepository extends JpaRepository<Injury, InjuryId> {
    List<Injury> findByPlayer_PlayerId(Integer playerId);
}