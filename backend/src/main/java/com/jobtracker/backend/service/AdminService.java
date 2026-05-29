package com.jobtracker.backend.service;

import com.jobtracker.backend.dto.JobResponseDTO;
import com.jobtracker.backend.dto.UserDTO;
import com.jobtracker.backend.model.User;
import com.jobtracker.backend.repository.JobApplicationRepository;
import com.jobtracker.backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional   //  apply transaction to whole class
public class AdminService {

    private final UserRepository userRepository;
    private final JobApplicationRepository jobRepository;

    public AdminService(UserRepository userRepository,
                        JobApplicationRepository jobRepository) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    
    //  GET ALL USERS (DTO)
  
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(u -> new UserDTO(
                        u.getId(),
                        u.getUsername(),
                        u.getRole() != null ? u.getRole().name() : "USER"
                ))
                .toList();
    }

  
    //  DELETE USER (SAFE)
   
    public String deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        //  IMPORTANT: delete jobs first (FK constraint fix)
        jobRepository.deleteAllByUser(user);

        userRepository.delete(user);

        return "User deleted successfully";
    }

   
    // GET ALL JOBS
   
    public List<JobResponseDTO> getAllJobs() {

        return jobRepository.findAll()
                .stream()
                .map(job -> new JobResponseDTO(
                        job.getId(),
                        job.getCompany(),
                        job.getRole(),
                        job.getStatus(),
                        job.getAppliedDate(),
                        job.getNotes()
                ))
                .toList();
    }

   
    // PROMOTE USER TO ADMIN
  
    public String makeAdmin(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(com.jobtracker.backend.model.Role.ADMIN);

        userRepository.save(user);

        return "User promoted to ADMIN";
    }
}