package com.jobtracker.backend.service;

import com.jobtracker.backend.model.User;
import com.jobtracker.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;

    public UserService(UserRepository userRepository, AuthService authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    // GET PROFILE
    public User getMyProfile() {

        String username = authService.getCurrentUsername();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // UPDATE PROFILE
    public User updateProfile(User updated) {

        String username = authService.getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(updated.getFullName());
        user.setEmail(updated.getEmail());
        user.setPhone(updated.getPhone());
        user.setProfileImageUrl(updated.getProfileImageUrl());

        return userRepository.save(user);
    }
}