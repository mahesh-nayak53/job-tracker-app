package com.jobtracker.backend.controller;

import com.jobtracker.backend.dto.ApiResponse;
import com.jobtracker.backend.dto.DashboardDTO;
import com.jobtracker.backend.service.DashboardService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    // GET DASHBOARD DATA
    @GetMapping
    public ApiResponse<DashboardDTO> getDashboard() {

        DashboardDTO data = service.getDashboard();

        return new ApiResponse<>(
                "SUCCESS",
                data,
                "Dashboard fetched successfully"
        );
    }
}