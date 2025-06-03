package com.alumni.alumnisystem.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class JobRequest {
    private String title;
    private String description;
    private String company;
    private String location;
    private LocalDate applicationDeadline;
}
