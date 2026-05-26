package com.jobtracker.backend.controller;

import com.jobtracker.backend.service.ResumeAnalyzerService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin("*")
public class ResumeAnalyzerController {

    private final ResumeAnalyzerService service;

    public ResumeAnalyzerController(
            ResumeAnalyzerService service
    ) {
        this.service = service;
    }

    @PostMapping("/analyze")
    public String analyzeResume(
            @RequestParam("file") MultipartFile file
    ) {

        return service.analyzeResume(file);
    }
}