package com.iplproject.iplapi.service;

import com.iplproject.iplapi.model.Season;
import com.iplproject.iplapi.repository.SeasonRepository;

import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final SeasonRepository seasonRepository;

    public ChatService(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    public String processMessage(String message) {

        message = message.toLowerCase();

        // simple rule-based logic (AI later)
        if (message.contains("winner")) {

            int year = extractYear(message);
            if (year == -1) {
                return "Please mention a valid season year.";
            }

            Season season = seasonRepository.findById(year).orElse(null);
            if (season == null || season.getWinnerTeam() == null) {
                return "Winner data not available for IPL " + year;
            }

            return "IPL " + year + " ka winner "
                    + season.getWinnerTeam().getTeamName() + " tha.";
        }

        return "Sorry, main abhi sirf IPL related questions samajhta hoon 🙂";
    }

    private int extractYear(String message) {
        for (int year = 2008; year <= 2030; year++) {
            if (message.contains(String.valueOf(year))) {
                return year;
            }
        }
        return -1;
    }
}
