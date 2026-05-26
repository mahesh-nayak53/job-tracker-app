package com.jobtracker.backend.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;

public class JobApplicationDTO {

	@NotBlank(message = "Company is required")
	private String company;

	@NotBlank(message = "Role is required")
	private String role;

	@NotBlank(message = "Status is required")
	private String status;
    private LocalDate appliedDate;
    private String notes;
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDate getAppliedDate() {
		return appliedDate;
	}
	public void setAppliedDate(LocalDate appliedDate) {
		this.appliedDate = appliedDate;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}

    // getters and setters
    
}