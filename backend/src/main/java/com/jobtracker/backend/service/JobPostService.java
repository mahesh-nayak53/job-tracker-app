package com.jobtracker.backend.service;

import com.jobtracker.backend.dto.JobPostDTO;
import com.jobtracker.backend.model.JobApplication;
import com.jobtracker.backend.model.JobPost;
import com.jobtracker.backend.model.User;
import com.jobtracker.backend.repository.JobApplicationRepository;
import com.jobtracker.backend.repository.JobPostRepository;
import com.jobtracker.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPostService {

    private final JobPostRepository repository;
    private final JobApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final AuthService authService;

    public JobPostService(
            JobPostRepository repository,
            JobApplicationRepository applicationRepository,
            UserRepository userRepository,
            AuthService authService) {

        this.repository = repository;
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    // CREATE JOB
    public JobPost createJob(JobPostDTO dto) {

        JobPost job = new JobPost();

        job.setCompany(dto.getCompany());
        job.setTitle(dto.getTitle());
        job.setLocation(dto.getLocation());
        job.setSalary(dto.getSalary());
        job.setDescription(dto.getDescription());

        return repository.save(job);
    }

    // GET ALL JOBS
    public List<JobPost> getAllJobs() {

        List<JobPost> jobs = repository.findAll();

        String username = authService.getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        for (JobPost job : jobs) {

            JobApplication application =
                    applicationRepository.findByUserAndJobPost(user, job);

            if (application != null) {

                job.setApplied(true);

                job.setApplicationStatus(application.getStatus());

            } else {

                job.setApplied(false);
            }
        }

        return jobs;
    }

    // DELETE JOB
    public void deleteJob(Long id) {
        repository.deleteById(id);
    }
}