package com.jobtracker.backend.repository;

import com.jobtracker.backend.model.JobPost;
import com.jobtracker.backend.model.SavedJob;
import com.jobtracker.backend.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedJobRepository
        extends JpaRepository<SavedJob, Long> {

    boolean existsByUserAndJobPost(User user, JobPost jobPost);

    List<SavedJob> findByUser(User user);

    void deleteByUserAndJobPost(User user, JobPost jobPost);
}