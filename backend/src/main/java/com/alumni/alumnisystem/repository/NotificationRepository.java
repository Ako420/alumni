package com.alumni.alumnisystem.repository;

import com.alumni.alumnisystem.model.Notification;
import com.alumni.alumnisystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientOrderByTimestampDesc(User user);
}
