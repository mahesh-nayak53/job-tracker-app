package com.jobtracker.backend.dto;

import java.time.LocalDate;

public class JobResponseDTO {

    private Long id;
    private String company;
    private String role;
    private String status;
    private LocalDate appliedDate;
    private String notes;

    // ✅ Constructor
    public JobResponseDTO(Long id, String company, String role,
                          String status, LocalDate appliedDate, String notes) {
        this.id = id;
        this.company = company;
        this.role = role;
        this.status = status;
        this.appliedDate = appliedDate;
        this.notes = notes;
    }

    // ✅ Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDate appliedDate) { this.appliedDate = appliedDate; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}