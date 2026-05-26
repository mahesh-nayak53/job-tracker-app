package com.jobtracker.backend.dto;

import java.util.List;

public class DashboardDTO {

    private long totalJobs;
    private long applied;
    private long interview;
    private long rejected;
    private long offer;

    private List<JobResponseDTO> recentJobs;

    // NEW
    private List<MonthlyStatsDTO> monthlyStats;
    private List<StatusStatsDTO> statusStats;
    private List<String> topCompanies;

    private Long totalUsers;

    public DashboardDTO(long totalJobs,
                        long applied,
                        long interview,
                        long rejected,
                        long offer,
                        List<JobResponseDTO> recentJobs,
                        List<MonthlyStatsDTO> monthlyStats,
                        List<StatusStatsDTO> statusStats,
                        List<String> topCompanies,
                        Long totalUsers) {

        this.totalJobs = totalJobs;
        this.applied = applied;
        this.interview = interview;
        this.rejected = rejected;
        this.offer = offer;
        this.recentJobs = recentJobs;
        this.monthlyStats = monthlyStats;
        this.statusStats = statusStats;
        this.topCompanies = topCompanies;
        this.totalUsers = totalUsers;
    }

    public long getTotalJobs() { return totalJobs; }
    public long getApplied() { return applied; }
    public long getInterview() { return interview; }
    public long getRejected() { return rejected; }
    public long getOffer() { return offer; }

    public List<JobResponseDTO> getRecentJobs() { return recentJobs; }
    public List<MonthlyStatsDTO> getMonthlyStats() { return monthlyStats; }
    public List<StatusStatsDTO> getStatusStats() { return statusStats; }
    public List<String> getTopCompanies() { return topCompanies; }

    public Long getTotalUsers() { return totalUsers; }
}