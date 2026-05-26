package com.jobtracker.backend.controller;

import com.jobtracker.backend.model.User;
import com.jobtracker.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin("*")
public class UserProfileController {

    private final UserService userService;

    public UserProfileController(UserService userService) {
        this.userService = userService;
    }

    // GET PROFILE
    @GetMapping
    public User getProfile() {
        return userService.getMyProfile();
    }

    // UPDATE PROFILE
    @PutMapping
    public User updateProfile(@RequestBody User user) {
        return userService.updateProfile(user);
    }
}