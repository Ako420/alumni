package com.alumni.alumnisystem.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "alumni_profiles")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlumniProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "graduation_year", nullable = false)
    private Integer graduationYear;

    private String course;

    @Column(name = "current_job")
    private String currentJob;

    private String company;
    private String phone;
    private String address;
    private String bio;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
