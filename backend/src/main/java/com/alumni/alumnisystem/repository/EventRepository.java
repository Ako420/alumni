package com.alumni.alumnisystem.repository;

import com.alumni.alumnisystem.model.Event;
import com.alumni.alumnisystem.model.EventStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByStatus(EventStatus status);
    long countByStatus(EventStatus status);
}
