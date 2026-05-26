package com.jobtracker.backend.dto;

public class UserDTO {

    private Long id;
    private String username;
    private String role;

    // ✅ Constructor (required for your service)
    public UserDTO(Long id, String username, String role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }

    // getters
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }
}