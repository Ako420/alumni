package com.alumni.alumnisystem.dto;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
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
