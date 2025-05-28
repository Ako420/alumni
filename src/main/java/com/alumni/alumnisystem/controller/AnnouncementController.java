package com.alumni.alumnisystem.controller;

import com.alumni.alumnisystem.dto.*;
import com.alumni.alumnisystem.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @PostMapping
    public String create(@RequestBody AnnouncementRequest request,
                         @AuthenticationPrincipal UserDetails userDetails) {
        announcementService.createAnnouncement(request, userDetails);
        return "Announcement posted successfully";
    }

    @GetMapping
    public List<AnnouncementResponse> getAll() {
        return announcementService.getAllAnnouncements();
    }

    @GetMapping("/{id}")
    public AnnouncementResponse getOne(@PathVariable Long id) {
        return announcementService.getAnnouncement(id);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id,
                         @AuthenticationPrincipal UserDetails userDetails) {
        announcementService.deleteAnnouncement(id, userDetails);
        return "Announcement deleted successfully";
    }
}
