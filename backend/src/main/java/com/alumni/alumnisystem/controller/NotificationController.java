package com.alumni.alumnisystem.controller;

import com.alumni.alumnisystem.dto.NotificationResponse;
import com.alumni.alumnisystem.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public List<NotificationResponse> getMyNotifications(@AuthenticationPrincipal UserDetails userDetails) {
        return notificationService.getMyNotifications(userDetails);
    }

    @PatchMapping("/{id}/read")
    public String markAsRead(@PathVariable Long id,
                             @AuthenticationPrincipal UserDetails userDetails) {
        notificationService.markAsRead(id, userDetails);
        return "Notification marked as read";
    }
}
