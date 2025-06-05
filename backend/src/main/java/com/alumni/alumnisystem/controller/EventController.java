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
    public String createEvent(@AuthenticationPrincipal UserDetails userDetails,
                              @RequestBody EventRequest request) {
        eventService.createEvent(userDetails, request);
        return "Event created successfully";
    }

    @GetMapping
    public List<EventResponse> getApprovedEvents() {
        return eventService.getApprovedEvents();
    }

    @GetMapping("/{id}")
    public EventResponse getEvent(@PathVariable Long id) {
        return eventService.getEventById(id);
    }
}
