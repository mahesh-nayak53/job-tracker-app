package com.jobtracker.backend.service;

import com.jobtracker.backend.dto.ApplyJobDTO;
import com.jobtracker.backend.dto.ApplicationResponseDTO;
import com.jobtracker.backend.model.JobApplication;
import com.jobtracker.backend.model.JobPost;
import com.jobtracker.backend.model.User;
import com.jobtracker.backend.repository.JobApplicationRepository;
import com.jobtracker.backend.repository.JobPostRepository;
import com.jobtracker.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobPostRepository jobPostRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final EmailService emailService;

    // SINGLE CORRECT CONSTRUCTOR
    public ApplicationService(
            JobApplicationRepository applicationRepository,
            JobPostRepository jobPostRepository,
            UserRepository userRepository,
            AuthService authService,
            EmailService emailService
    ) {
        this.applicationRepository = applicationRepository;
        this.jobPostRepository = jobPostRepository;
        this.userRepository = userRepository;
        this.authService = authService;
        this.emailService = emailService;
    }

    // GET ALL APPLICATIONS (ADMIN)
    public List<ApplicationResponseDTO> getAllApplications() {

        return applicationRepository.findAllByOrderByIdDesc()
                .stream()
                .map(app -> new ApplicationResponseDTO(
                        app.getId(),
                        app.getUser() != null ? app.getUser().getUsername() : "Unknown User",
                        app.getCompany() != null ? app.getCompany() : "No Company",
                        app.getRole() != null ? app.getRole() : "No Role",
                        app.getStatus() != null ? app.getStatus() : "APPLIED",
                        app.getResumeUrl()
                ))
                .collect(Collectors.toList());
    }

    // APPLY JOB
    public String applyJob(ApplyJobDTO dto) {

        String username = authService.getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        JobPost jobPost = jobPostRepository.findById(dto.getJobPostId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // prevent duplicate application
        boolean alreadyApplied =
                applicationRepository.existsByUserAndJobPost(user, jobPost);

        if (alreadyApplied) {
            throw new RuntimeException("You already applied for this job");
        }

        JobApplication application = new JobApplication();

        application.setUser(user);
        application.setJobPost(jobPost);

        application.setCompany(jobPost.getCompany());
        application.setRole(jobPost.getTitle());

        application.setStatus("APPLIED");
        application.setResumeUrl(dto.getResumeUrl());

        applicationRepository.save(application);

        return "Job applied successfully";
    }

    // CHECK IF APPLIED
    public boolean hasApplied(Long jobPostId) {

        String username = authService.getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        JobPost jobPost = jobPostRepository.findById(jobPostId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        return applicationRepository.existsByUserAndJobPost(user, jobPost);
    }

    // UPDATE STATUS + EMAIL
    public String updateStatus(Long id, String status) {

        JobApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status);
        applicationRepository.save(application);

        User user = application.getUser();

        if (user == null || user.getEmail() == null) {
            throw new RuntimeException("User email missing");
        }

        emailService.sendStatusEmail(
                user.getEmail(),
                application.getCompany(),
                application.getRole(),
                status
        );

        return "Status updated successfully";
    }

    // GET MY APPLICATIONS (USER)
    public List<ApplicationResponseDTO> getMyApplications() {

        String username = authService.getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<JobApplication> apps =
                applicationRepository.findByUser(user);

        return apps.stream()
                .map(app -> new ApplicationResponseDTO(
                        app.getId(),
                        app.getUser().getUsername(),
                        app.getCompany(),
                        app.getRole(),
                        app.getStatus(),
                        app.getResumeUrl()
                ))
                .collect(Collectors.toList());
    }
    
    public String withdrawApplication(Long id) {

        JobApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        applicationRepository.delete(application);

        return "Application withdrawn successfully";
    }
}