package com.jobtracker.backend.service;

import com.jobtracker.backend.dto.AuthDTO;
import com.jobtracker.backend.dto.AuthResponse;
import com.jobtracker.backend.model.Role;
import com.jobtracker.backend.model.User;
import com.jobtracker.backend.repository.UserRepository;
import com.jobtracker.backend.util.JwtUtil;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository repository,
                       PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ REGISTER
    public String register(AuthDTO dto) {

        // 🔒 prevent duplicate users
        if (repository.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        // default role
        user.setRole(Role.USER);

        repository.save(user);

        return "User registered successfully";
    }

    // ✅ LOGIN
//    public String login(AuthDTO dto) {
//
//        User user = repository.findByUsername(dto.getUsername())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
//            throw new RuntimeException("Invalid password");
//        }
//
//        // 🔐 include role in token
//        return JwtUtil.generateToken(
//                user.getUsername(),
//                user.getRole().name()
//        );
//    }
    
    
    public AuthResponse login(AuthDTO dto) {

        User user = repository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = JwtUtil.generateToken(
                user.getUsername(),
                user.getRole().name()
        );

        return new AuthResponse(
                token,
                "ROLE_" + user.getRole().name()
        );
    }
    // ✅ GET CURRENT USERNAME (SAFE)
    public String getCurrentUsername() {

        Object principal = SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        if (principal instanceof UserDetails userDetails) {
            return userDetails.getUsername();
        }

        // 🔒 handle anonymous safely
        if (principal instanceof String && principal.equals("anonymousUser")) {
            throw new RuntimeException("User not authenticated");
        }

        return principal.toString();
    }

    // ✅ GET CURRENT ROLE (SAFE)
    public String getCurrentRole() {

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            throw new RuntimeException("No authentication found");
        }

        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getAuthorities()
                .stream()
                .findFirst()
                .map(auth -> auth.getAuthority())
                .orElse("ROLE_USER"); // fallback
    }
}