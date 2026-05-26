package com.jobtracker.backend.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class RegisterDTO {
	@Column(unique = true)
    private String username;
    private String password;
}