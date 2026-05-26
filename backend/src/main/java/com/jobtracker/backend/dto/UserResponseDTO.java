package com.jobtracker.backend.dto;

import com.jobtracker.backend.model.Role;

public class UserResponseDTO {

    private Long id;
    private String username;
    private Role role;

    public UserResponseDTO(Long id, String username, Role role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public Role getRole() { return role; }
}