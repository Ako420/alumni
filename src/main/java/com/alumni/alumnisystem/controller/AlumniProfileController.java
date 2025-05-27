package com.alumni.alumnisystem.controller;

import com.alumni.alumnisystem.dto.*;
import com.alumni.alumnisystem.service.AlumniProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class AlumniProfileController {

    private final AlumniProfileService profileService;

    @GetMapping
    public ProfileResponse getMyProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return profileService.getProfile(userDetails);
    }

    @PutMapping
    public String updateMyProfile(@AuthenticationPrincipal UserDetails userDetails,
                                  @RequestBody ProfileUpdateRequest request) {
        profileService.updateProfile(userDetails, request);
        return "Profile updated successfully";
    }
}
