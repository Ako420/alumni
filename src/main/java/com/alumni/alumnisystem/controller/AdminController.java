package com.alumni.alumnisystem.controller;

import com.alumni.alumnisystem.dto.AdminDashboardResponse;
import com.alumni.alumnisystem.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public AdminDashboardResponse getDashboard(@AuthenticationPrincipal UserDetails userDetails) {
        return adminService.getDashboardStats(userDetails);
    }
}
