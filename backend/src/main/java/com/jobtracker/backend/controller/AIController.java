package com.jobtracker.backend.controller;

import com.jobtracker.backend.service.AIService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody Map<String, String> body) {

        return aiService.chat(body.get("message"));
    }
}