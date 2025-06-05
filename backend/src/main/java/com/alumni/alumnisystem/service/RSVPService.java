package com.alumni.alumnisystem.service;

import com.alumni.alumnisystem.dto.RSVPRequest;
import com.alumni.alumnisystem.model.*;
import com.alumni.alumnisystem.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RSVPService {

    private final UserRepository userRepo;
    private final EventRepository eventRepo;
    private final EventRSVPRepository rsvpRepo;

    public void rsvpToEvent(Long eventId, RSVPRequest request, UserDetails userDetails) {
        User user = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.alumni) {
            throw new RuntimeException("Only alumni can RSVP to events.");
        }

        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        EventRSVP rsvp = rsvpRepo.findByEventAndUser(event, user)
                .orElse(EventRSVP.builder().event(event).user(user).build());

        rsvp.setStatus(request.getStatus());

        rsvpRepo.save(rsvp);
    }
}
