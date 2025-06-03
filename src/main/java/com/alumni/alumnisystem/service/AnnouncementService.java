package com.alumni.alumnisystem.service;

import com.alumni.alumnisystem.dto.*;
import com.alumni.alumnisystem.model.*;
import com.alumni.alumnisystem.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final AnnouncementRepository announcementRepo;
    private final UserRepository userRepo;

    public void createAnnouncement(AnnouncementRequest request, UserDetails userDetails) {
        User admin = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (admin.getRole() != Role.admin) {
            throw new RuntimeException("Only admins can post announcements.");
        }

        Announcement announcement = Announcement.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .createdBy(admin)
                .build();

        announcementRepo.save(announcement);
    }

    public List<AnnouncementResponse> getAllAnnouncements() {
        return announcementRepo.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AnnouncementResponse getAnnouncement(Long id) {
        Announcement a = announcementRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));
        return toResponse(a);
    }

    public void deleteAnnouncement(Long id, UserDetails userDetails) {
        User admin = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (admin.getRole() != Role.admin) {
            throw new RuntimeException("Only admins can delete announcements.");
        }

        Announcement a = announcementRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));
        announcementRepo.delete(a);
    }

    private AnnouncementResponse toResponse(Announcement a) {
        return AnnouncementResponse.builder()
                .id(a.getId())
                .title(a.getTitle())
                .content(a.getContent())
                .createdBy(a.getCreatedBy().getEmail())
                .createdAt(a.getCreatedAt())
                .build();
    }
}
