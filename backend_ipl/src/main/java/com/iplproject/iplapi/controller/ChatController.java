package com.iplproject.iplapi.controller;

import com.iplproject.iplapi.model.Season;
import com.iplproject.iplapi.repository.SeasonRepository;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @Autowired
    private SeasonRepository seasonRepository;

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> req) {

        String msg = req.get("message").toLowerCase();
        String reply = "Sorry, main abhi sirf IPL season related questions samajhta hoon 🙂";

        Integer year = extractYear(msg);

        if (year == null) {
            return Map.of("reply", "Please season year mention karo (jaise: IPL 2022)");
        }

        Season season = seasonRepository.findById(year).orElse(null);

        if (season == null) {
            return Map.of("reply", "IPL " + year + " ka data database mein nahi mila 😕");
        }

        if (msg.contains("winner")) {
            reply = "IPL " + year + " ka winner "
                    + season.getWinnerTeam().getTeamName() + " tha.";

        } else if (msg.contains("prize")) {
            reply = "IPL " + year + " ka prize money ₹"
                    + season.getPrizeMoney();

        } else if (msg.contains("status")) {
            reply = "IPL " + year + " ka status "
                    + season.getStatus();

        } else if (msg.contains("duration") || msg.contains("start") || msg.contains("end")) {
            reply = "IPL " + year + " ka duration "
                    + season.getStartDate() + " se "
                    + season.getEndDate() + " tak tha.";

        } else if (msg.contains("match")) {
            reply = "IPL " + year + " mein total "
                    + season.getTotalMatches() + " matches hue the.";

        } else if (msg.contains("team")) {
            reply = "IPL " + year + " mein total "
                    + season.getTotalTeams() + " teams thi.";

        } else {
            reply = "Main ye bata sakta hoon: winner, prize money, status, duration, matches, teams 🙂";
        }

        return Map.of("reply", reply);
    }

    private Integer extractYear(String msg) {
        for (int y = 2008; y <= 2035; y++) {
            if (msg.contains(String.valueOf(y))) {
                return y;
            }
        }
        return null;
    }
}
