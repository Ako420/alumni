package com.alumni.alumnisystem.repository;

import com.alumni.alumnisystem.model.AdminProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminProfileRepository extends JpaRepository<AdminProfile, Long> {
}
