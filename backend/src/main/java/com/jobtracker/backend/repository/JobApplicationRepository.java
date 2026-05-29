package com.jobtracker.backend.repository;

import com.jobtracker.backend.model.JobApplication;
import com.jobtracker.backend.model.User;
import com.jobtracker.backend.model.JobPost;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

	boolean existsByUserAndJobPost(User user, JobPost jobPost);

    List<JobApplication> findByUser(User user);
    List<JobApplication> findAllByOrderByIdDesc();

    Page<JobApplication> findByUser(User user, Pageable pageable);
    
    JobApplication findByUserAndJobPost(User user, JobPost jobPost);

    void deleteAllByUser(User user);

   
    // SEARCH (CLEAN VERSION)
  

    @Query("""
        SELECT j FROM JobApplication j
        WHERE j.user = :user AND (
            LOWER(j.company) LIKE LOWER(CONCAT('%', :search, '%')) OR
            LOWER(j.role) LIKE LOWER(CONCAT('%', :search, '%')) OR
            LOWER(j.status) LIKE LOWER(CONCAT('%', :search, '%'))
        )
    """)
    Page<JobApplication> searchUserJobs(
            @Param("user") User user,
            @Param("search") String search,
            Pageable pageable
    );

    
    // STATUS FILTER


    Page<JobApplication> findByStatus(String status, Pageable pageable);

    Page<JobApplication> findByUserAndStatus(User user, String status, Pageable pageable);

   
    // DASHBOARD COUNTS
   

    long countByUser(User user);

    long countByUserAndStatus(User user, String status);

    long countByStatus(String status);

   
    // DASHBOARD ANALYTICS
 

    @Query("""
        SELECT FUNCTION('DATE_FORMAT', j.appliedDate, '%Y-%m'), COUNT(j)
        FROM JobApplication j
        GROUP BY FUNCTION('DATE_FORMAT', j.appliedDate, '%Y-%m')
    """)
    List<Object[]> getMonthlyStats();

    @Query("""
        SELECT FUNCTION('DATE_FORMAT', j.appliedDate, '%Y-%m'), COUNT(j)
        FROM JobApplication j
        WHERE j.user = :user
        GROUP BY FUNCTION('DATE_FORMAT', j.appliedDate, '%Y-%m')
    """)
    List<Object[]> getMonthlyStatsByUser(@Param("user") User user);

    @Query("""
        SELECT j.status, COUNT(j)
        FROM JobApplication j
        GROUP BY j.status
    """)
    List<Object[]> getStatusStats();

    @Query("""
        SELECT j.status, COUNT(j)
        FROM JobApplication j
        WHERE j.user = :user
        GROUP BY j.status
    """)
    List<Object[]> getStatusStatsByUser(@Param("user") User user);

    @Query("""
        SELECT j.company, COUNT(j) as cnt
        FROM JobApplication j
        GROUP BY j.company
        ORDER BY cnt DESC
    """)
    List<Object[]> getTopCompanies();
}