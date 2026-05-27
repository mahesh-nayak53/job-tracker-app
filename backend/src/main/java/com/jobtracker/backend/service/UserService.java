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
    public User updateProfile(User updatedUser) {

        User existingUser = getMyProfile();

        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setProfileImageUrl(updatedUser.getProfileImageUrl());
        existingUser.setResumeUrl(updatedUser.getResumeUrl());

        return userRepository.save(existingUser);
    }
}