package com.alumni.alumnisystem.service;

import com.alumni.alumnisystem.dto.AdminDashboardResponse;
import com.alumni.alumnisystem.model.EventStatus;
import com.alumni.alumnisystem.model.Role;
import com.alumni.alumnisystem.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepo;
    private final EventRepository eventRepo;
    private final JobOpportunityRepository jobRepo;
    private final AnnouncementRepository announcementRepo;

    public AdminDashboardResponse getDashboardStats(UserDetails userDetails) {
        var user = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Unauthorized"));

        if (user.getRole() != Role.admin) {
            throw new RuntimeException("Access denied. Only admins can view dashboard.");
        }

        return AdminDashboardResponse.builder()
                .totalUsers(userRepo.count())
                .totalAlumni(userRepo.countByRole(Role.alumni))
                .totalAdmins(userRepo.countByRole(Role.admin))
                .totalEvents(eventRepo.count())
                .approvedEvents(eventRepo.countByStatus(EventStatus.approved))
                .totalJobs(jobRepo.count())
                .totalAnnouncements(announcementRepo.count())
                .build();
    }
}
