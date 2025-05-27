package com.alumni.alumnisystem.service;

import com.alumni.alumnisystem.dto.*;
import com.alumni.alumnisystem.model.AlumniProfile;
import com.alumni.alumnisystem.model.User;
import com.alumni.alumnisystem.repository.AlumniProfileRepository;
import com.alumni.alumnisystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlumniProfileService {

    private final UserRepository userRepository;
    private final AlumniProfileRepository profileRepository;

    public ProfileResponse getProfile(UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        AlumniProfile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return ProfileResponse.builder()
                .fullName(profile.getFullName())
                .graduationYear(profile.getGraduationYear())
                .course(profile.getCourse())
                .currentJob(profile.getCurrentJob())
                .company(profile.getCompany())
                .phone(profile.getPhone())
                .address(profile.getAddress())
                .bio(profile.getBio())
                .profileImage(profile.getProfileImage())
                .linkedinUrl(profile.getLinkedinUrl())
                .build();
    }

    public void updateProfile(UserDetails userDetails, ProfileUpdateRequest request) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        AlumniProfile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // Update fields
        profile.setFullName(request.getFullName());
        profile.setGraduationYear(request.getGraduationYear());
        profile.setCourse(request.getCourse());
        profile.setCurrentJob(request.getCurrentJob());
        profile.setCompany(request.getCompany());
        profile.setPhone(request.getPhone());
        profile.setAddress(request.getAddress());
        profile.setBio(request.getBio());
        profile.setProfileImage(request.getProfileImage());
        profile.setLinkedinUrl(request.getLinkedinUrl());

        profileRepository.save(profile);
    }
}
