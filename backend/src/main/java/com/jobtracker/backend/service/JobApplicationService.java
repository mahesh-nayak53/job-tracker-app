package com.jobtracker.backend.service;

import com.jobtracker.backend.dto.JobApplicationDTO;
import com.jobtracker.backend.dto.JobResponseDTO;
import com.jobtracker.backend.model.JobApplication;
import com.jobtracker.backend.model.User;
import com.jobtracker.backend.repository.JobApplicationRepository;
import com.jobtracker.backend.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class JobApplicationService {

    private static final Logger log = LoggerFactory.getLogger(JobApplicationService.class);

    private final JobApplicationRepository repository;
    private final UserRepository userRepository;
    private final AuthService authService;

    public JobApplicationService(JobApplicationRepository repository,
                                 UserRepository userRepository,
                                 AuthService authService) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    // CREATE JOB
    public JobResponseDTO addJob(JobApplicationDTO dto) {

        User user = getCurrentUser();

        JobApplication job = new JobApplication();
        job.setCompany(dto.getCompany());
        job.setRole(dto.getRole());
        job.setStatus(dto.getStatus());
        job.setAppliedDate(dto.getAppliedDate());
        job.setNotes(dto.getNotes());
        job.setUser(user);

        log.info("Creating job for user: {}", user.getUsername());

        return mapToDTO(repository.save(job));
    }

    // READ JOBS (PAGINATION + SORT + ROLE BASED)
    public Page<JobResponseDTO> getAllJobs(int page, int size, String search,
            String status,
            String sortBy, String direction) {

    	String role = authService.getCurrentRole();
    	User user = getCurrentUser();

    	if (sortBy == null || sortBy.isEmpty()) {
    	    sortBy = "appliedDate";
    	}

    	if (direction == null || direction.isEmpty()) {
    	    direction = "desc";
    	}

    	Sort sort = direction.equalsIgnoreCase("asc")
    	        ? Sort.by(sortBy).ascending()
    	        : Sort.by(sortBy).descending();

    	Pageable pageable = PageRequest.of(page, size, sort);

    	Page<JobApplication> jobs;

    	// ADMIN
    	if ("ROLE_ADMIN".equals(role)) {

    	    if (status != null && !status.isEmpty()) {
    	        jobs = repository.findByStatus(status, pageable);
    	    } else {
    	        jobs = repository.findAll(pageable);
    	    }

    	}
    	// USER
    	else {

    	    if (search != null && !search.isEmpty()) {
    	        jobs = repository.searchUserJobs(user, search, pageable);
    	    } 
    	    else if (status != null && !status.isEmpty()) {
    	        jobs = repository.findByUserAndStatus(user, status, pageable);
    	    } 
    	    else {
    	        jobs = repository.findByUser(user, pageable);
    	    }
    	}

    	return jobs.map(this::mapToDTO);
    }

    // UPDATE JOB
    public JobResponseDTO updateJob(Long id, JobApplicationDTO dto) {

        User user = getCurrentUser();
        String role = authService.getCurrentRole();

        JobApplication job = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // ADMIN → can update anything
        // USER → only own job
        if (!"ROLE_ADMIN".equals(role)) {
            if (job.getUser() == null ||
                !job.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Not allowed");
            }
        }

        job.setCompany(dto.getCompany());
        job.setRole(dto.getRole());
        job.setStatus(dto.getStatus());
        job.setAppliedDate(dto.getAppliedDate());
        job.setNotes(dto.getNotes());

        log.info("Updating job id: {}", id);

        return mapToDTO(repository.save(job));
    }

    // DELETE JOB
    public String deleteJob(Long id) {

        User user = getCurrentUser();
        String role = authService.getCurrentRole();

        JobApplication job = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // ADMIN → can delete anything
        // USER → only own job
        if (!"ROLE_ADMIN".equals(role)) {
            if (job.getUser() == null ||
                !job.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Not allowed");
            }
        }

        repository.delete(job);

        log.info("Deleted job id: {}", id);

        return "Deleted successfully";
    }

    // DTO MAPPER
    private JobResponseDTO mapToDTO(JobApplication job) {
        return new JobResponseDTO(
                job.getId(),
                job.getCompany(),
                job.getRole(),
                job.getStatus(),
                job.getAppliedDate(),
                job.getNotes()
        );
    }

    // GET LOGGED-IN USER
    private User getCurrentUser() {

        String username = authService.getCurrentUsername();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}