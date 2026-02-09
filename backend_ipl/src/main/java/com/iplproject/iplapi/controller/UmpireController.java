package com.iplproject.iplapi.controller;

import com.iplproject.iplapi.model.Umpire;
import com.iplproject.iplapi.repository.UmpireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/umpires")
public class UmpireController {

    @Autowired
    private UmpireRepository repository;

    @GetMapping
    public List<Umpire> getAllUmpires() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Umpire getUmpireById(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }
    
    @PostMapping
    public Umpire createUmpire(@RequestBody Umpire umpire) {
        return repository.save(umpire);
    }
    
    @PutMapping("/{id}")
    public Umpire updateUmpire(@PathVariable Integer id, @RequestBody Umpire umpire) {
        umpire.setUmpireId(id);
        return repository.save(umpire);
    }
    
    @DeleteMapping("/{id}")
    public void deleteUmpire(@PathVariable Integer id) {
    	repository.deleteById(id);
    }
}
