package com.alumni.alumnisystem.service;

import com.alumni.alumnisystem.dto.EventRequest;
import com.alumni.alumnisystem.dto.EventResponse;
import com.alumni.alumnisystem.model.*;
import com.alumni.alumnisystem.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepo;
    private final UserRepository userRepo;
    private final NotificationService notificationService;

    public void createEvent(EventRequest request, UserDetails userDetails) {
        User admin = getUser(userDetails);
        if (admin.getRole() != Role.admin) {
            throw new RuntimeException("Only admins can create events.");
        }

        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .eventDate(request.getEventDate())
                .eventTime(request.getEventTime())
                .location(request.getLocation())
                .maxAttendees(request.getMaxAttendees())
                .status(EventStatus.approved)
                .createdBy(admin)
                .build();

        eventRepo.save(event);

        List<User> alumni = userRepo.findAll().stream()
                .filter(u -> u.getRole() == Role.alumni && u.isEnabled())
                .toList();

        alumni.forEach(user ->
                notificationService.notifyUser(user, "New Event: " + event.getTitle(), true)
        );
    }

    public void updateEvent(Long id, EventRequest request, UserDetails userDetails) {
        User admin = getUser(userDetails);
        if (admin.getRole() != Role.admin) {
            throw new RuntimeException("Only admins can update events.");
        }

        Event event = getEvent(id);
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setEventDate(request.getEventDate());
        event.setEventTime(request.getEventTime());
        event.setLocation(request.getLocation());
        event.setMaxAttendees(request.getMaxAttendees());

        eventRepo.save(event);
    }

    public List<EventResponse> getAllApprovedEvents() {
        return eventRepo.findByStatus(EventStatus.approved)
                .stream().map(this::toResponse).toList();
    }

    public EventResponse getEventById(Long id) {
        return toResponse(getEvent(id));
    }

    public void deleteEvent(Long id, UserDetails userDetails) {
        User admin = getUser(userDetails);
        if (admin.getRole() != Role.admin) {
            throw new RuntimeException("Only admins can delete events.");
        }
        eventRepo.deleteById(id);
    }

    private Event getEvent(Long id) {
        return eventRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    private EventResponse toResponse(Event event) {
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

    private User getUser(UserDetails userDetails) {
        return userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
