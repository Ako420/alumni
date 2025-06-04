package com.alumni.alumnisystem.controller;

import com.alumni.alumnisystem.dto.*;
import com.alumni.alumnisystem.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping
    public String create(@RequestBody EventRequest request,
                         @AuthenticationPrincipal UserDetails user) {
        eventService.createEvent(request, user);
        return "Event created (awaiting approval).";
    }

    @PutMapping("/{id}/status")
    public String updateStatus(@PathVariable Long id,
                               @RequestParam String status,
                               @AuthenticationPrincipal UserDetails user) {
        eventService.updateEventStatus(id, status, user);
        return "Event status updated to: " + status;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id,
                         @AuthenticationPrincipal UserDetails user) {
        eventService.deleteEvent(id, user);
        return "Event deleted.";
    }

    @GetMapping
    public List<EventResponse> getAllApproved() {
        return eventService.getAllApprovedEvents();
    }

    @GetMapping("/{id}")
    public EventResponse getOne(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    @PostMapping("/{id}/rsvp")
    public String rsvp(@PathVariable Long id,
                       @RequestBody RSVPRequest request,
                       @AuthenticationPrincipal UserDetails user) {
        eventService.rsvpToEvent(id, request, user);
        return "RSVP recorded.";
    }

    @GetMapping("/{id}/rsvps")
    public List<RSVPResponse> viewRsvps(@PathVariable Long id,
                                        @AuthenticationPrincipal UserDetails user) {
        return eventService.getRsvps(id, user);
    }
}
