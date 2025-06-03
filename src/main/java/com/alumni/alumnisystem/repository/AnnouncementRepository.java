package com.alumni.alumnisystem.repository;

import com.alumni.alumnisystem.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}
