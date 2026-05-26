package com.jobtracker.backend.service;

import com.jobtracker.backend.dto.*;
import com.jobtracker.backend.model.JobApplication;
import com.jobtracker.backend.model.User;
import com.jobtracker.backend.repository.JobApplicationRepository;
import com.jobtracker.backend.repository.UserRepository;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final JobApplicationRepository jobRepository;
    private final UserRepository userRepository;
    private final AuthService authService;

    public DashboardService(JobApplicationRepository jobRepository,
                            UserRepository userRepository,
                            AuthService authService) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    public DashboardDTO getDashboard() {

        String role = authService.getCurrentRole();
        String username = authService.getCurrentUsername();

        User user = null;
        if (!role.equals("ROLE_ADMIN")) {
            user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }

        long totalJobs = role.equals("ROLE_ADMIN")
                ? jobRepository.count()
                : jobRepository.countByUser(user);

        long applied = role.equals("ROLE_ADMIN")
                ? jobRepository.countByStatus("APPLIED")
                : jobRepository.countByUserAndStatus(user, "APPLIED");

        long interview = role.equals("ROLE_ADMIN")
                ? jobRepository.countByStatus("INTERVIEW")
                : jobRepository.countByUserAndStatus(user, "INTERVIEW");

        long rejected = role.equals("ROLE_ADMIN")
                ? jobRepository.countByStatus("REJECTED")
                : jobRepository.countByUserAndStatus(user, "REJECTED");

        long offer = role.equals("ROLE_ADMIN")
                ? jobRepository.countByStatus("OFFER")
                : jobRepository.countByUserAndStatus(user, "OFFER");

        List<JobResponseDTO> recentJobs = (role.equals("ROLE_ADMIN")
                ? jobRepository.findAll(PageRequest.of(0, 5))
                : jobRepository.findByUser(user, PageRequest.of(0, 5)))
                .map(this::mapToDTO)
                .toList();

        // Monthly stats
        List<MonthlyStatsDTO> monthlyStats;

        if (role.equals("ROLE_ADMIN")) {
            monthlyStats = jobRepository.getMonthlyStats()
                    .stream()
                    .map(obj -> new MonthlyStatsDTO(
                    		obj[0] != null ? obj[0].toString() : "UNKNOWN",
                            ((Number) obj[1]).longValue()
                    ))
                    .toList();
        } else {
            monthlyStats = jobRepository.getMonthlyStatsByUser(user)
                    .stream()
                    .map(obj -> new MonthlyStatsDTO(
                    		obj[0] != null ? obj[0].toString() : "UNKNOWN",
                            ((Number) obj[1]).longValue()
                    ))
                    .toList();
        }

        // Status stats
        List<StatusStatsDTO> statusStats;

        if (role.equals("ROLE_ADMIN")) {
            statusStats = jobRepository.getStatusStats()
                    .stream()
                    .map(obj -> new StatusStatsDTO(
                    		obj[0] != null ? obj[0].toString() : "UNKNOWN",
                            ((Number) obj[1]).longValue()
                    ))
                    .toList();
        } else {
            statusStats = jobRepository.getStatusStatsByUser(user)
                    .stream()
                    .map(obj -> new StatusStatsDTO(
                    		obj[0] != null ? obj[0].toString() : "UNKNOWN",
                            ((Number) obj[1]).longValue()
                    ))
                    .toList();
        }

        // Top companies
        List<String> topCompanies = jobRepository.getTopCompanies()
                .stream()
                .limit(5)
                .map(obj -> obj[0] != null ? obj[0].toString() : "UNKNOWN")
                .collect(Collectors.toList());

        Long totalUsers = role.equals("ROLE_ADMIN")
                ? userRepository.count()
                : null;

        return new DashboardDTO(
                totalJobs,
                applied,
                interview,
                rejected,
                offer,
                recentJobs,
                monthlyStats,
                statusStats,
                topCompanies,
                totalUsers
        );
    }

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
}