package com.jobtracker.backend.dto;

public class ApplicationResponseDTO {

    private Long id;
    private String username;
    private String company;
    private String role;
    private String status;
    private String resumeUrl;

    public ApplicationResponseDTO() {}

    public ApplicationResponseDTO(Long id, String username, String company,
                                  String role, String status, String resumeUrl) {
        this.id = id;
        this.username = username;
        this.company = company;
        this.role = role;
        this.status = status;
        this.resumeUrl = resumeUrl;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getCompany() { return company; }
    public String getRole() { return role; }
    public String getStatus() { return status; }
    public String getResumeUrl() { return resumeUrl; }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }
}