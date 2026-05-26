package com.jobtracker.backend.repository;

import com.jobtracker.backend.model.User;
import com.jobtracker.backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    List<User> findByRole(Role role);
}