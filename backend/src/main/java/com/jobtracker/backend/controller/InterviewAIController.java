package com.jobtracker.backend.controller;

import com.jobtracker.backend.service.InterviewAIService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/interview-ai")
@CrossOrigin("*")
public class InterviewAIController {

    private final InterviewAIService service;

    public InterviewAIController(InterviewAIService service) {
        this.service = service;
    }

    @PostMapping
    public String generateQuestions(
            @RequestBody Map<String, String> request
    ) {

        String role = request.get("role");
        String skills = request.get("skills");

        return service.generateQuestions(role, skills);
    }
}