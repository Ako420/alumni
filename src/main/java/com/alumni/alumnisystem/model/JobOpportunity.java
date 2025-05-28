package com.alumni.alumnisystem.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_opportunities")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobOpportunity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String company;
    private String location;

    @Column(name = "application_deadline")
    private LocalDate applicationDeadline;

    @ManyToOne
    @JoinColumn(name = "posted_by")
    private User postedBy;


    @Builder.Default
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
     @Builder.Default
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
