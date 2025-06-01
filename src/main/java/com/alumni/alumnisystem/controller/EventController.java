package com.alumni.alumnisystem.controller;

import com.alumni.alumnisystem.dto.EventRequest;
import com.alumni.alumnisystem.dto.EventResponse;
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
        return "Event created successfully.";
    }

    @PutMapping("/{id}")
    public String update(@PathVariable Long id,
                         @RequestBody EventRequest request,
                         @AuthenticationPrincipal UserDetails user) {
        eventService.updateEvent(id, request, user);
        return "Event updated successfully.";
    }

    @GetMapping
    public List<EventResponse> getAll() {
        return eventService.getAllApprovedEvents();
    }

    @GetMapping("/{id}")
    public EventResponse getOne(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id,
                         @AuthenticationPrincipal UserDetails user) {
        eventService.deleteEvent(id, user);
        return "Event deleted successfully.";
    }
}
