package com.jobtracker.backend.service;

import com.jobtracker.backend.model.JobPost;
import com.jobtracker.backend.model.SavedJob;
import com.jobtracker.backend.model.User;
import com.jobtracker.backend.repository.JobPostRepository;
import com.jobtracker.backend.repository.SavedJobRepository;
import com.jobtracker.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedJobService {

    private final SavedJobRepository savedJobRepository;
    private final JobPostRepository jobPostRepository;
    private final UserRepository userRepository;
    private final AuthService authService;

    public SavedJobService(
            SavedJobRepository savedJobRepository,
            JobPostRepository jobPostRepository,
            UserRepository userRepository,
            AuthService authService
    ) {
        this.savedJobRepository = savedJobRepository;
        this.jobPostRepository = jobPostRepository;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    public String saveJob(Long jobId) {

        String username = authService.getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow();

        JobPost job = jobPostRepository.findById(jobId)
                .orElseThrow();

        boolean alreadySaved =
                savedJobRepository.existsByUserAndJobPost(user, job);

        if (alreadySaved) {
            return "Already Saved";
        }

        SavedJob savedJob = new SavedJob();

        savedJob.setUser(user);
        savedJob.setJobPost(job);

        savedJobRepository.save(savedJob);

        return "Job Saved";
    }

    public List<SavedJob> getSavedJobs() {

        String username = authService.getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow();

        return savedJobRepository.findByUser(user);
    }

    @Transactional
    public String removeSavedJob(Long jobId) {

        String username = authService.getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow();

        JobPost job = jobPostRepository.findById(jobId)
                .orElseThrow();

        savedJobRepository.deleteByUserAndJobPost(user, job);

        return "Removed";
    }
}