package com.alumni.alumnisystem.service;

import com.alumni.alumnisystem.dto.*;
import com.alumni.alumnisystem.model.*;
import com.alumni.alumnisystem.repository.EventRepository;
import com.alumni.alumnisystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepo;
    private final UserRepository userRepo;

    public void createEvent(UserDetails userDetails, EventRequest request) {
        User user = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.admin) {
            throw new RuntimeException("Only admins can create events");
        }

        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .eventDate(request.getEventDate())
                .eventTime(request.getEventTime())
                .location(request.getLocation())
                .maxAttendees(request.getMaxAttendees())
                .status(EventStatus.approved) // auto-approved for now
                .createdBy(user)
                .build();

        eventRepo.save(event);
    }

    public List<EventResponse> getApprovedEvents() {
        return eventRepo.findByStatus(EventStatus.approved)
                .stream()
                .map(event -> EventResponse.builder()
                        .id(event.getId())
                        .title(event.getTitle())
                        .description(event.getDescription())
                        .eventDate(event.getEventDate())
                        .eventTime(event.getEventTime())
                        .location(event.getLocation())
                        .maxAttendees(event.getMaxAttendees())
                        .status(event.getStatus().name())
                        .build())
                .collect(Collectors.toList());
    }

    public EventResponse getEventById(Long id) {
        Event event = eventRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .eventDate(event.getEventDate())
                .eventTime(event.getEventTime())
                .location(event.getLocation())
                .maxAttendees(event.getMaxAttendees())
                .status(event.getStatus().name())
                .build();
    }
    public void updateEventStatus(Long eventId, EventStatus status, UserDetails userDetails) {
    User admin = userRepo.findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (admin.getRole() != Role.admin) {
        throw new RuntimeException("Only admins can modify event status.");
    }

    Event event = eventRepo.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Event not found"));

    event.setStatus(status);
    eventRepo.save(event);
}

}
