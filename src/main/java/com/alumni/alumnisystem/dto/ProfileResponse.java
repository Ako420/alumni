package com.alumni.alumnisystem.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileResponse {
    private String fullName;
    private Integer graduationYear;
    private String course;
    private String currentJob;
    private String company;
    private String phone;
    private String address;
    private String bio;
    private String profileImage;
    private String linkedinUrl;
}
