package com.alumni.alumnisystem.repository;

import com.alumni.alumnisystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    long countByRole(com.alumni.alumnisystem.model.Role role);

}
