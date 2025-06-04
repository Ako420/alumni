package com.alumni.alumnisystem.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationResponse {
    private Long id;
    private String message;
    private boolean isRead;
    private LocalDateTime timestamp;
}
