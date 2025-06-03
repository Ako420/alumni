package com.alumni.alumnisystem.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "admin_profiles")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
