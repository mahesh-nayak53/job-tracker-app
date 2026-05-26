package com.jobtracker.backend.controller;

import com.jobtracker.backend.dto.AuthDTO;
import com.jobtracker.backend.dto.AuthResponse;
import com.jobtracker.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public String register(@RequestBody AuthDTO dto) {
        return service.register(dto);
    }
//
//    @PostMapping("/login")
//    public String login(@RequestBody AuthDTO dto) {
//        return service.login(dto);
//    }
    
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthDTO dto) {
        return service.login(dto);
    }
}