package com.alumni.alumnisystem.service;

import com.alumni.alumnisystem.dto.*;
import com.alumni.alumnisystem.model.*;
import com.alumni.alumnisystem.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepo;
    private final UserRepository userRepo;
    private final EventRSVPRepository rsvpRepo;
    private final NotificationService notificationService;

    // ✅ Admin creates event (auto pending)
    public void createEvent(EventRequest request, UserDetails userDetails) {
        User admin = getUser(userDetails);
        checkAdmin(admin);

        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .eventDate(request.getEventDate())
                .eventTime(request.getEventTime())
                .location(request.getLocation())
                .maxAttendees(request.getMaxAttendees())
                .status(EventStatus.pending)
                .createdBy(admin)
                .build();

        eventRepo.save(event);
    }

    // ✅ Admin approves or cancels event
    public void updateEventStatus(Long eventId, String status, UserDetails userDetails) {
        User admin = getUser(userDetails);
        checkAdmin(admin);

        Event event = getEvent(eventId);
        event.setStatus(EventStatus.valueOf(status.toLowerCase()));
        eventRepo.save(event);

        if (event.getStatus() == EventStatus.approved) {
            List<User> alumni = userRepo.findAll().stream()
                    .filter(u -> u.getRole() == Role.alumni && u.isEnabled())
                    .collect(Collectors.toList());

            alumni.forEach(user ->
                notificationService.notifyUser(user,
                    "📢 New Event Approved: " + event.getTitle(), true)
            );
        }
    }

    // ✅ Admin deletes event
    public void deleteEvent(Long id, UserDetails userDetails) {
        User admin = getUser(userDetails);
        checkAdmin(admin);
        eventRepo.deleteById(id);
    }

    // ✅ Everyone: Get all approved events
    public List<EventResponse> getAllApprovedEvents() {
        return eventRepo.findByStatus(EventStatus.approved)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // ✅ Everyone: Get one event
    public EventResponse getEventById(Long id) {
        return toResponse(getEvent(id));
    }

    // ✅ Admin + Alumni: RSVP
    public void rsvpToEvent(Long eventId, RSVPRequest request, UserDetails userDetails) {
        User user = getUser(userDetails);
        Event event = getEvent(eventId);

        EventRSVP rsvp = rsvpRepo.findByEventAndUser(event, user)
                .orElse(EventRSVP.builder().event(event).user(user).build());

        rsvp.setStatus(request.getStatus());
        rsvpRepo.save(rsvp);
    }

    // ✅ Admin views RSVPs
    public List<RSVPResponse> getRsvps(Long eventId, UserDetails userDetails) {
        User admin = getUser(userDetails);
        checkAdmin(admin);

        Event event = getEvent(eventId);
        return rsvpRepo.findByEvent(event)
                .stream()
                .map(r -> new RSVPResponse(
                        r.getUser().getEmail(),
                        r.getUser().getEmail(),
                        r.getStatus()
                ))
                .collect(Collectors.toList());
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

    private User getUser(UserDetails details) {
        return userRepo.findByEmail(details.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private void checkAdmin(User user) {
        if (user.getRole() != Role.admin) {
            throw new RuntimeException("Access denied: Admin only.");
        }
    }
}
