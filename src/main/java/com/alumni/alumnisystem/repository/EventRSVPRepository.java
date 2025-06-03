package com.alumni.alumnisystem.repository;

import com.alumni.alumnisystem.model.Event;
import com.alumni.alumnisystem.model.EventRSVP;
import com.alumni.alumnisystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventRSVPRepository extends JpaRepository<EventRSVP, Long> {
    Optional<EventRSVP> findByEventAndUser(Event event, User user);
    List<EventRSVP> findByEvent(Event event);
}
