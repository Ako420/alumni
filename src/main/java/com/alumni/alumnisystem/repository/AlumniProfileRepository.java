package com.alumni.alumnisystem.repository;

import com.alumni.alumnisystem.model.AlumniProfile;
import com.alumni.alumnisystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlumniProfileRepository extends JpaRepository<AlumniProfile, Long> {
    Optional<AlumniProfile> findByUser(User user);
}
