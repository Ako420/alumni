package com.alumni.alumnisystem.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminDashboardResponse {
    private long totalUsers;
    private long totalAlumni;
    private long totalAdmins;
    private long totalEvents;
    private long approvedEvents;
    private long totalJobs;
    private long totalAnnouncements;
}
