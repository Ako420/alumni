package com.alumni.alumnisystem.repository;

import com.alumni.alumnisystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
