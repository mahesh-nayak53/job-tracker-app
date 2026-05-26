package com.jobtracker.backend.dto;

public class StatusStatsDTO {

    private String status;
    private long count;

    public StatusStatsDTO(String status, long count) {
        this.status = status;
        this.count = count;
    }

    public String getStatus() { return status; }
    public long getCount() { return count; }
}