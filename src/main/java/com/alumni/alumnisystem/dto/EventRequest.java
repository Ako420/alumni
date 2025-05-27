package com.alumni.alumnisystem.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class EventRequest {
    private String title;
    private String description;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String location;
    private Integer maxAttendees;
}
