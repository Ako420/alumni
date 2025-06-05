package com.alumni.alumnisystem.controller;

import com.alumni.alumnisystem.dto.RSVPRequest;
import com.alumni.alumnisystem.service.RSVPService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class RSVPController {

    private final RSVPService rsvpService;

    @PostMapping("/{id}/rsvp")
    public String rsvpToEvent(@PathVariable Long id,
                              @RequestBody RSVPRequest request,
                              @AuthenticationPrincipal UserDetails userDetails) {
        rsvpService.rsvpToEvent(id, request, userDetails);
        return "RSVP updated successfully";
    }
}
