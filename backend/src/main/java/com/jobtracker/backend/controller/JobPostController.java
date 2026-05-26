package com.jobtracker.backend.controller;

import com.jobtracker.backend.dto.JobPostDTO;
import com.jobtracker.backend.model.JobPost;
import com.jobtracker.backend.service.JobPostService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-posts")
@CrossOrigin("*")
public class JobPostController {

    private final JobPostService service;

    public JobPostController(JobPostService service) {
        this.service = service;
    }

    // CREATE JOB
    @PostMapping
    public JobPost createJob(@RequestBody JobPostDTO dto) {
        return service.createJob(dto);
    }

    // GET ALL JOBS
    @GetMapping
    public List<JobPost> getAllJobs() {
        return service.getAllJobs();
    }

    // DELETE JOB
    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        service.deleteJob(id);
    }
}