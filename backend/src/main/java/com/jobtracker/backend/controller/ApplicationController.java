package com.jobtracker.backend.controller;

import com.jobtracker.backend.dto.ApplyJobDTO;
import com.jobtracker.backend.dto.ApplicationResponseDTO;
import com.jobtracker.backend.service.ApplicationService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("*")
public class ApplicationController {

    private final ApplicationService service;

    public ApplicationController(ApplicationService service) {
        this.service = service;
    }

    // APPLY JOB
    @PostMapping("/apply")
    public String applyJob(@RequestBody ApplyJobDTO request) {
        return service.applyJob(request);
    }

    // ALL APPLICATIONS
    @GetMapping
    public List<ApplicationResponseDTO> getAllApplications() {
        return service.getAllApplications();
    }

    // MY APPLICATIONS
    @GetMapping("/my")
    public List<ApplicationResponseDTO> getMyApplications() {
        return service.getMyApplications();
    }

    // CHECK APPLIED
    @GetMapping("/check/{jobId}")
    public boolean hasApplied(@PathVariable Long jobId) {
        return service.hasApplied(jobId);
    }

    // UPDATE STATUS
    @PutMapping("/{id}/status")
    public String updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return service.updateStatus(id, status);
    }

    // WITHDRAW APPLICATION
    @DeleteMapping("/withdraw/{id}")
    public String withdrawApplication(@PathVariable Long id) {

        return service.withdrawApplication(id);
    }
}