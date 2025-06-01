package com.alumni.alumnisystem.service;

import com.alumni.alumnisystem.dto.NotificationResponse;
import com.alumni.alumnisystem.model.*;
import com.alumni.alumnisystem.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepo;
    private final UserRepository userRepo;
    private final JavaMailSender mailSender;

    // 📩 Send hybrid (in-app + optional email)
    public void notifyUser(User user, String message, boolean sendEmail) {
        // 1. Save in DB
        Notification notification = Notification.builder()
                .message(message)
                .recipient(user)
                .build();
        notificationRepo.save(notification);

        // 2. Send email
        if (sendEmail) {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(user.getEmail());
            mail.setSubject("Alumni Notification");
            mail.setText(message);
            mailSender.send(mail);
        }
    }

    public List<NotificationResponse> getMyNotifications(UserDetails userDetails) {
        User user = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return notificationRepo.findByRecipientOrderByTimestampDesc(user)
                .stream()
                .map(n -> NotificationResponse.builder()
                        .id(n.getId())
                        .message(n.getMessage())
                        .isRead(n.isRead())
                        .timestamp(n.getTimestamp())
                        .build())
                .collect(Collectors.toList());
    }

    public void markAsRead(Long id, UserDetails userDetails) {
        User user = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification n = notificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!n.getRecipient().equals(user)) {
            throw new RuntimeException("Access denied");
        }

        n.setRead(true);
        notificationRepo.save(n);
    }
}
