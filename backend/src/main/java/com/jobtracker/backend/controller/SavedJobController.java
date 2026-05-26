package com.jobtracker.backend.controller;

import com.jobtracker.backend.model.SavedJob;
import com.jobtracker.backend.service.SavedJobService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-jobs")
@CrossOrigin("*")
public class SavedJobController {

    private final SavedJobService savedJobService;

    public SavedJobController(SavedJobService savedJobService) {
        this.savedJobService = savedJobService;
    }

    @PostMapping("/{jobId}")
    public String saveJob(@PathVariable Long jobId) {
        return savedJobService.saveJob(jobId);
    }

    @GetMapping
    public List<SavedJob> getSavedJobs() {
        return savedJobService.getSavedJobs();
    }

    @DeleteMapping("/{jobId}")
    public String removeSavedJob(@PathVariable Long jobId) {
        return savedJobService.removeSavedJob(jobId);
    }
}