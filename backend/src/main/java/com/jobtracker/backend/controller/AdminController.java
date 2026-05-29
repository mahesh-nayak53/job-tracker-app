package com.jobtracker.backend.controller;

import com.jobtracker.backend.dto.JobResponseDTO;
import com.jobtracker.backend.dto.UserDTO;
import com.jobtracker.backend.service.AdminService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")

public class AdminController {

    private final AdminService service;

    public AdminController(AdminService service) {
        this.service = service;
    }

    //  GET USERS
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        return service.getAllUsers();
    }

    // DELETE USER
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        return service.deleteUser(id);
    }

    // GET ALL JOBS
    @GetMapping("/jobs")
    public List<JobResponseDTO> getAllJobs() {
        return service.getAllJobs();
    }

    //  PROMOTE USER
    @PutMapping("/users/{id}/make-admin")
    public String makeAdmin(@PathVariable Long id) {
        return service.makeAdmin(id);
    }
}