package com.jobtracker.backend.repository;

import com.jobtracker.backend.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobPostRepository extends JpaRepository<JobPost, Long> {
}